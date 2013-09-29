var ID_SOCKET_PAIR = [];
var mysqlConn;
var socket;
var classState;
var groupShare;
var io;

var StudentTools = require("./studentTools");
var TeacherTools = require("./teacherTools");

//**************
// Functions
//**************
exports.call = function(_socket, received, mysqlConnection, _ID_SOCKET_PAIR, _classState, _groupShare, _io) {

	ID_SOCKET_PAIR = _ID_SOCKET_PAIR;
	mysqlConn = mysqlConnection;
	socket = _socket;
	classState = _classState;
	groupShare = _groupShare;
	io = _io;

	console.log("student controller call function %j", received);

	//MessageNum에 따라서 분기 - 각각의 처리에 맞는 함수 호출
	switch( parseInt(received.MessageNum, 10) ) {

		case StudentTools.CLIENT_REQUEST_LOGIN:
			clientRequestLogin(received);
			break;
		case StudentTools.CLIENT_REQUEST_ATTEND:
			clientRequestAttend(received);
			break;
		case StudentTools.CLIENT_REQUEST_GROUPATTEND:
			clientRequestGroupAttend(received);
			break;

		case StudentTools.CLIENT_REQUEST_CONNECTION:
			clientRequestConnection(received);
			break;

		case StudentTools.CLIENT_REQUEST_WORKSHEETRESULT:
			clientRequestWorkSheetResult(received);
			break;

		case StudentTools.CLIENT_REQUEST_WORKSHEETPROGRESS:
			clientRequestWorkSheetProgress(received);
			break;

		case StudentTools.CLIENT_REQUEST_CARDFLIP:
			clientRequestCardFlip(received);
			break;

		default:
			break;
	}

}
function clientRequestCardFlip(received) {

	console.log("fuction clientRequestCardFlip ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_CARDFLIP;
	res.id = received.id;
	res.success = 1;
	//별일 없으면 요청은 성공한다.

	var flippedCard = received.cardNum;

	//send result to client
	socket.emit('data', res);

	//take wordList
	var roomname;
	var wordList;
	var groupNum;
	var studentId = received.id;

	for (var i = 0; i < ID_SOCKET_PAIR.length; i++) {
		if (ID_SOCKET_PAIR[i].id == studentId) {
			roomname = ID_SOCKET_PAIR[i].roomname;
			groupNum = parseInt(roomname);
			wordList = groupShare.groupList[groupNum].wordList;
		}
	}

	wordList[flippedCard].flipped = 1;

	//send to group people cardflipped(241)
	var req = TeacherTools.newRequest();
	req.MessageNum = StudentTools.SERVER_REQUEST_CARDFLIPPED;
	req.id = received.id;
	req.cardNum = flippedCard;

	io.sockets. in (roomname).emit('data', req);

	if (groupShare.groupList[groupNum].flippedFirst == -1) {
		groupShare.groupList[groupNum].flippedFirst = flippedCard;
	} else {

		groupShare.groupList[groupNum].flippedSecond = flippedCard;

		var flipResult = 0;

		if (wordList[groupShare.groupList[groupNum].flippedFirst].answerNum == wordList[groupShare.groupList[groupNum].flippedSecond].answerNum) {
			flipResult = 1;
		} else {
			//flipped card return
			wordList[groupShare.groupList[groupNum].flippedFirst].flipped = 0;
			wordList[groupShare.groupList[groupNum].flippedSecond].flipped = 0;
		}

		//send to group people flipResult(243)
		req = TeacherTools.newRequest();
		req.MessageNum = StudentTools.SERVER_REQUEST_FLIPRESULT;
		req.id = received.id;
		req.flipSuccess = flipResult;

		io.sockets. in (roomname).emit('data', req);

		//send student my turn message(237)
		req = TeacherTools.newRequest();
		req.MessageNum = StudentTools.SERVER_REQUEST_TURNSTART;
		req.id = received.id;

		var nextStudent;
		
		for (var k = 0; k < groupShare.groupList[groupNum].studentList.length; k++) {
			if (groupShare.groupList[groupNum].studentList[k] == received.id) {
				nextStudent = groupShare.groupList[groupNum].studentList[(k + 1) % (groupShare.groupList[groupNum].studentList.length)];
				break;
			}
		}
 
		for (var j = 0; j < ID_SOCKET_PAIR.length; j++) {
			if (ID_SOCKET_PAIR[j].id == nextStudent) {
				ID_SOCKET_PAIR[j].socket.emit('data', req);
			}
		}

		groupShare.groupList[groupNum].flippedFirst = -1;
		groupShare.groupList[groupNum].flippedSecond = -1;
	}

	//send teacher group info change(147)
	req = TeacherTools.newRequest();
	req.MessageNum = TeacherTools.SERVER_REQUEST_CARDGROUPINFOCHANGE;
	req.id = received.id;

	//count remainNum for each group
	var tempList = new Array();
	for (var i = 0; i < groupShare.groupList.length; i++) {
		var tempCount = 0;
		for (var j = 0; j < groupShare.groupList[i].wordList.length; j++) {
			
			if (groupShare.groupList[i].wordList[j].flipped == 0) {
				tempCount += 1;
			}
		}

		tempList.push(parseInt((tempCount + 1) / 2));
	}
	req.remainNumList = tempList;

	for (var i = 0; i < ID_SOCKET_PAIR.length; i++) {
		if (parseInt(ID_SOCKET_PAIR[i].manType, 10) == TeacherTools.TEACHER) {
			ID_SOCKET_PAIR[i].socket.emit('data', req);
		}
	}
	

	//send game end message to students
	req = TeacherTools.newRequest();
	req.MessageNum = StudentTools.SERVER_REQUEST_CARDGAMEEND;
	req.id = received.id;

	for (var i = 0; i < tempList.length; i++) {
		if (tempList[i] == 0) {		
			io.sockets. in ('' + i).emit('data', req);
		}
	}

}

function clientRequestWorkSheetProgress(received) {

	console.log("fuction clientRequestWorkSheetProgress ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_WORKSHEETPROGRESS;
	res.id = received.id;
	res.success = 1;
	//별일 없으면 요청은 성공한다.

	//send result to client
	socket.emit('data', res);

	var req = TeacherTools.newRequest();
	req.MessageNum = TeacherTools.SERVER_REQUEST_WORKSHEETPROGRESS;
	req.id = received.id;
	req.progressInfo = received.progressInfo;

	for (var i = 0; i < ID_SOCKET_PAIR.length; i++) {
		if (parseInt(ID_SOCKET_PAIR[i].manType, 10) == TeacherTools.TEACHER) {
			ID_SOCKET_PAIR[i].socket.emit('data', req);
		}
	}

}

var cnt = 0;

function clientRequestWorkSheetResult(received) {

	console.log("fuction clientRequestWorkSheetResult ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_WORKSHEETRESULT;
	res.id = received.id;
	res.success = 1;
	//蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎.

	//DB insertion
	//  -latte-lecture activity
	//insert into workseet_answer info
	var query = "insert into latte_worksheet_answer" + " (subjectNum, studentId, activityNum)  " + " select subjectNum, '" + received.id + "', " + received.activityNum + " from latte_lecture  " + " where lectureNum = (select lectureNum from latte_lecture_activity  " + " where activityNum =   " + received.activityNum + ")";

	console.log(query);

	mysqlConn.query(query, function(err, rows) {
		if (err) {
			console.log("mysql query err");
			console.log(err);
			res.success = 0;
			socket.emit('data', res);
		} else {
			console.log("rows ::::: %j ", rows);

			var query2;
			for (var i = 0; i < received.workSheetAnswer.answerArr.length; i++) {
				query2 = "insert into latte_worksheet_answer_blank " + "( worksheetAnswerNum, slideNum, startX, startY, width, height, answer)" + " values " + "  ( " + rows.insertId + ", " + received.workSheetAnswer.answerArr[i].pageNum + ", " + received.workSheetAnswer.answerArr[i].startX + ", " + received.workSheetAnswer.answerArr[i].startY + ", " + received.workSheetAnswer.answerArr[i].width + ", " + received.workSheetAnswer.answerArr[i].height + ", '" + received.workSheetAnswer.answerArr[i].answer + "'); ";

				console.log(query2);

				mysqlConn.query(query2, function(err, rows) {
					if (err) {
						console.log("mysql query err");
						console.log(err);

					} else {
						cnt++;
						if (cnt == (received.workSheetAnswer.answerArr.length )) {
							//send result to client
							socket.emit('data', res);
							cnt = 0;
						}

					}
				});
			}

		}

	});

}

function clientRequestConnection(received) {

	console.log("fuction clientRequestConnection ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_CONNECTION;
	res.id = received.id;
	res.success = 1;
	//별일 없으면 요청은 성공한다.

	socket.emit('data', res);
}

function clientRequestGroupAttend(received) {

	console.log("fuction clientRequestGroupAttend ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_GROUPATTEND;
	res.id = received.id;
	res.success = 1;
	//별일 없으면 요청은 성공한다.

	console.log("groupShare : %j", groupShare);

	//retreive groupShare
	groupShare.groupList[received.groupId].studentList.push(received.id);

	//결과는 마이에스큐엘까지 끝난 다음 반환한다.
	//결과 보내기
	socket.emit('data', res);

	//send groupin message(209) to student mobile client
	var req = TeacherTools.newRequest();
	req.MessageNum = StudentTools.SERVER_REQUEST_GROUPIN;
	req.id = received.id;
	req.studentId = received.id;
	req.groupId = received.groupId;

	var i = 0;

	for ( i = 0; i < ID_SOCKET_PAIR.length; i++) {
		if (parseInt(ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.MOBILE) {
			if (parseInt(ID_SOCKET_PAIR[i].manType, 10) == TeacherTools.STUDENT) {
				ID_SOCKET_PAIR[i].socket.emit('data', req);
			}

		}

	}

	//send groupin message(115) to teacher client
	var req = TeacherTools.newRequest();
	req.MessageNum = TeacherTools.SERVER_REQUEST_GROUPIN;
	req.id = received.id;
	req.studentId = received.id;
	req.groupId = received.groupId;

	var i = 0;

	for ( i = 0; i < ID_SOCKET_PAIR.length; i++) {
		if (parseInt(ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.MOBILE) {
			if (parseInt(ID_SOCKET_PAIR[i].manType, 10) == TeacherTools.TEACHER) {

				ID_SOCKET_PAIR[i].socket.emit('data', req);
			}

		}

	}

}

///////////////////////DevelopeComplete/////////////////

function clientRequestLogin(received) {

	console.log("fuction clientRequestLogin ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_LOGIN;
	res.id = received.id;
	res.success = 1;
	//별일 없으면 요청은 성공한다.
	res.is_success = 0;
	//is_success 는 로그인을 성공했는가 이다.

	var query = "select studentPw from latte_student where studentId = '" + received.id + "'";

	mysqlConn.query(query, function(err, rows) {
		if (err) {
			console.log("mysql query err");
			console.log(err);
			res.success = 0;
		} else if (rows.length) {
			console.log(" rrrr : " + rows[0].studentPw);

			if (received.password == rows[0].studentPw) {

				res.is_success = 1;
			}
		}
		//결과는 마이에스큐엘까지 끝난 다음 반환한다.
		//결과 보내기
		socket.emit('data', res);

		//선생님이 액티비티를 실행한 경우

		if (classState.activityStart == 1) {
			if (classState.activityType == TeacherTools.ATTENDANCE) {
				var req = TeacherTools.newRequest();
				req.MessageNum = StudentTools.SERVER_REQUEST_STARTATTENDACTIVITY;
				socket.emit('data', req);
			}
		}

	});

}

function clientRequestAttend(received) {

	console.log("fuction clientRequestAttend ");

	var res = TeacherTools.newResponse();
	res.MessageNum = StudentTools.SERVER_RESPONSE_ATTEND;
	res.id = received.id;
	res.success = 1;
	//별일 없으면 요청은 성공한다.
	res.is_success = 0;
	//is_success 는 로그인을 성공했는가 이다.

	var req = TeacherTools.newRequest();
	req.MessageNum = TeacherTools.SERVER_REQUEST_ATTEND;
	req.id = received.id;

	//학생들에게 액티비티를 시작하라고 요청해준다.
	for (var i = 0; i < ID_SOCKET_PAIR.length; i++) {
		if (parseInt(ID_SOCKET_PAIR[i].manType, 10) == TeacherTools.TEACHER) {
			ID_SOCKET_PAIR[i].socket.emit('data', req);
		}
	}

	//결과는 마이에스큐엘까지 끝난 다음 반환한다.
	//결과 보내기
	socket.emit('data', res);

}

