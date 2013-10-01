var socket;
var checkConnection=false;
var arr;
function connect() {
  // Log errors
	socket = io.connect('http://lattetime.cafe24.com:8888');
	
	socket.on('data', function (res) {
	        
	        console.log(res.MessageNum);
	        if(res.MessageNum == 302) {//로그인
		        if(res.is_success == 1)
		        {
			        alert("반갑습니다 "+res.id+"선생님");
			        sessionStorage.setItem('id', res.id);
			        location.href = "./main/main.html";
		        } 
		        else 
		        {
			    	alert("로그인 정보를 다시 확인하세요");    
		        }
	        } /* end of 302 */
	        else if(res.MessageNum == 334) {
		        var studentList = new Array();
	        	if(typeof res.studentList != "undefined") {
		        	for(i = 0; i < res.studentList.length;i++) {
        				studentList[i] = new DTO();
		        		studentList[i].studentId = res.studentList[i].studentId;
		        		studentList[i].workSheetAnswerNum = res.studentList[i].workSheetAnwerNum;
		        	}
		        }
	        	sessionStorage["studentList"] = JSON.stringify(studentList);
	        	location.href = "../submit/studentList.html";
	            
	        }
	        else if(res.MessageNum == 304) { //로그아웃
		        if(res.is_success == 1)
		        {
			        alert("로그아웃 되셨습니다.");
			        location.href = "../index.html";
		        }
		        else 
		        {
			        alert("로그아웃 실패라니 흔치 않은일이네요. 좋은하루 되시고 다시한번 로그아웃 눌러주세요.");
		        }
	        }
	        else if(res.MessageNum == 306) { //과목 정보 가져오기
	        	var arr = new Array();
	        	if(typeof res.subjectList != "undefined") {
		        	for(i = 0; i < res.subjectList.length;i++) {
		        			arr[i] = new subjectDTO();
			        		arr[i].subjectNum = res.subjectList[i].subjectNum;
			        		arr[i].subjectName = res.subjectList[i].subjectName;
			        		arr[i].className = res.subjectList[i].className;
		        	}
		        }
	        	sessionStorage["subjectList"] = JSON.stringify(arr);
	        	if (sessionStorage["selMenu"] == "subject") {
		        	location.href = "../lecture/mylecture.html";
	        	} else if( sessionStorage["selMenu"] == "submit") {
		        	location.href = "../submit/mylecture.html";
	        	}
	        }
	        else if(res.MessageNum == 314) { //PPT LIST 가져오기
	        	var arr = new Array();
	        	if(typeof res.pptList != "undefined") {
		        	for(i = 0; i < res.pptList.length;i++) {
	        			arr[i] = new activityDTO();
		        		arr[i].activityNum = res.pptList[i].activityNum;
		        		arr[i].activityName = res.pptList[i].activityName;
		        	}
	        	}
	        	sessionStorage["subjectList"] = JSON.stringify(arr);
	        	console.log(arr);
	        	if( sessionStorage["VIEW_PPT"] == "YES" )
	        	{
	        		sessionStorage.setItem("VIEW_PPT","NO");
	        		location.href = "../upload/ppt_preview2.html";
		        	
	        	}
	        	else 
	        	{
	        		location.href = "../upload/ppt.html";
		        	
	        	}
	        }
	        else if(res.MessageNum == 344) { //카드게임 list 가져오기  /////////////번호 바꾸기
	        	var arr = new Array();
	        	if(typeof res.cardgameList != "undefined") {
		        	for(i = 0; i < res.cardgameList.length;i++) {
	        			arr[i] = new activityDTO();
		        		arr[i].activityNum = res.cardgameList[i].activityNum;
		        		arr[i].activityName = res.cardgameList[i].activityName;
		        	}
	        	}
	        	sessionStorage["subjectList"] = JSON.stringify(arr);
	        	location.href = "../upload/cardgame.html";
		        
	        }
	        else if(res.MessageNum == 318) { //WORKSHEET LIST 가져오기
	        	var arr = new Array();
  	        	if(typeof res.workSheetList != "undefined") {
		        	for(i = 0; i < res.workSheetList.length;i++) {
		        			arr[i] = new activityDTO();
			        		arr[i].activityNum = res.workSheetList[i].activityNum;
			        		arr[i].activityName = res.workSheetList[i].activityName;
	
		        	}
		        }
	        	sessionStorage["subjectList"] = JSON.stringify(arr);
	        	console.log(arr);
	        	location.href = "../upload/worksheet.html";
	        }
	         else if(res.MessageNum == 308) { //수업 정보 가져오기
	        	var arr = new Array();
  	        	if(typeof res.lectureList != "undefined") {
	
		        	for(i = 0; i < res.lectureList.length;i++) {
		        			arr[i] = new lectureDTO();
			        		arr[i].lecNum = res.lectureList[i].lecNum;
			        		arr[i].lecName = res.lectureList[i].lecName;
			        		arr[i].lecOrder = res.lectureList[i].lecOrder;
	
		        	}
		        }
	        	sessionStorage["lectureList"] = JSON.stringify(arr);
	        	location.href = "../lecture/lecture_list.html";
		        
	        }
	        else if(res.MessageNum == 310) { //수업 정보 및 강의 정보 가져오기(수업정보 가져오기 수정 !)
	        	var ppt = new Array();
	        	var worksheet = new Array();
	        	j = 0;
	        	k = 0;
	        	if(typeof res.activityList != "undefined") {
		        	console.log(res.activityList);
		        	for(i = 0; i < res.activityList.length;i++) {
		        			if(res.activityList[i].actType == "PPT" ) { //ppt
			        			ppt[j] = new DTO();
				        		ppt[j].actNum = res.activityList[i].actNum;
				        		ppt[j].actName = res.activityList[i].actName;
				        		j++;
		        			} else if(res.activityList[i].actType == "WORKSHEET" ) { //work sheets
		        				worksheet[k] = new DTO();
				        		worksheet[k].actNum = res.activityList[i].actNum;
				        		worksheet[k].actName = res.activityList[i].actName;	     
				        		k++;   			
		        			} 
		        	}
		        }
	        	sessionStorage["selPptList"] = JSON.stringify(ppt);
	        	sessionStorage["selWorksheetList"] = JSON.stringify(worksheet);
	       
	        	getAllActivityList(); // 모든 엑티비티 리스트 받아오기 ! 
		        
	        }
	        else if(res.MessageNum == 322) {//출석정보 0결석 1출석 2지각 
	        	var attendInfo = new Array();
	        
	        	//수업갯수 저장하려공 !!! 
	        	lecCnt = 1;
	        	state = 1; //횟수를 샐것인지 말것인지.
	        	if(typeof res.attendInfo != "undefined") {
	
		        	preLec = res.attendInfo[0].lectureNum;
		        	
		        	for (i = 0; i < res.attendInfo.length; i++) {//2차원배열?!
			        	attendInfo[i] = new AttendInfo();
			        	attendInfo[i].studentId = res.attendInfo[i].studentId;
			        	attendInfo[i].studentNum = res.attendInfo[i].studentNum;
			        	attendInfo[i].lectureNum = res.attendInfo[i].lectureNum;
			        	attendInfo[i].attendance = res.attendInfo[i].attendance;
			        	attendInfo[i].studentImg = res.attendInfo[i].studentImg;
			        	
			        	if (state == 1 ) {
			        		console.log(preLec+':'+res.attendInfo[i+1].lectureNum);
				        	if(preLec < res.attendInfo[i+1].lectureNum) {
					        	lecCnt++;
				        	} else {
					        	state = 0;
				        	}
				        }
		        	}
		        }
	        	sessionStorage.setItem('lecCnt', lecCnt);
	        	
	        	sessionStorage["attendInfo"] = JSON.stringify(attendInfo);
	        	console.log(attendInfo);
	        	console.log("lecCnt : "+lecCnt);
	        	
	        	location.href = "../attend/attend.html";
		        
	        }
	        else if(res.MessageNum == 328) { //모든엑티비티리스트 가져오기
	        	var ppt = new Array();
	        	var worksheet = new Array();
	        	j = 0;
	        	k = 0;
	        	if(typeof res.activityList != "undefined") {
		        	console.log(res.activityList);
		        	for(i = 0; i < res.activityList.length;i++) {
		        			if(res.activityList[i].actType == "PPT" ) { //ppt
			        			ppt[j] = new DTO();
				        		ppt[j].actNum = res.activityList[i].actNum;
				        		ppt[j].actName = res.activityList[i].actName;
				        		j++;
		        			} else if(res.activityList[i].actType == "WORKSHEET" ) { //work sheets
		        				worksheet[k] = new DTO();
				        		worksheet[k].actNum = res.activityList[i].actNum;
				        		worksheet[k].actName = res.activityList[i].actName;	     
				        		k++;   			
		        			} 
		        	}
		        }
	        	sessionStorage["pptList"] = JSON.stringify(ppt);
	        	sessionStorage["worksheetList"] = JSON.stringify(worksheet);
	        	
	        	location.href = "../lecture/make_lecture.html";
	        }
	        else if(res.MessageNum == 330) {
		        var pptRoutes = new Array();
		        var pageNum = res.pageNum;
		        for(i = 0; i < res.pptInfo.routes.length; i++) {
			        pptRoutes[i] = new PPTRoute();
			        pptRoutes[i].pageNum = res.pptInfo.routes[i].pageNum;
			        pptRoutes[i].route = res.pptInfo.routes[i].route;
		        }
		        sessionStorage.setItem("pageNum", pageNum);
		        sessionStorage["pptRoutes"] = JSON.stringify(pptRoutes);
		        sessionStorage.setItem("selPptImg", 0);
		        console.log(pptRoutes);
		        getPptList();
//	        	location.href = "../upload/ppt_preview.html";

	        }
	        else if(res.MessageNum == 332) {
	            var worksheetRoutes = res.workSheetInfo.routes[0].route;
		        var answerArr = new Array();
		        if(typeof res.answerArr != "undefined") {
			        for(i = 0; i < res.answerArr.length; i++) {
				    	 answerArr[i] = new AnswerSpace();
				    	 answerArr[i].startX = res.answerArr[i].startX;
				    	 answerArr[i].startY = res.answerArr[i].startY;
				    	 answerArr[i].width = res.answerArr[i].width;
				    	 answerArr[i].height = res.answerArr[i].height;
				    	 answerArr[i].answer = res.answerArr[i].answer;
				    	 answerArr[i].pageNum = res.answerArr[i].pageNum;
			        }
			    }
		        console.log(worksheetRoutes);
		        console.log(answerArr);
		        sessionStorage.setItem("worksheetRoutes", worksheetRoutes);
		        sessionStorage["AnswerArr"] = JSON.stringify(answerArr);
		        if (sessionStorage["ws_mode"] == "upload") {
		        	sessionStorage.setItem("ws_mode", "load");
			        location.href = "../upload/make_worksheet.html";
		        } 
		        else if (sessionStorage["ws_mode"] == "complete") {
		        	sessionStorage.setItem("ws_mode", "load");
			        location.href = "../upload/worksheet.html";
		        }
		        else if (sessionStorage["ws_mode"] == "submit") {
   		        	sessionStorage.setItem("ws_mode", "load");
			        location.href = "../submit/answer.html";

		        }
		        else {
			        location.href = "../upload/worksheet_preview.html";

		        }

	        }
	        else if(res.MessageNum == 324) {  // 새 수업 구성하기 수업정보 생성후 페이지를 리로드한다.
		        getLectureList(sessionStorage["selSubject"]);
	        }
	        else if(res.MessageNum == 342) { //걍 업로드 후 재연결 
		        
	        }
	        else if(res.MessageNum == 337) {//업로드 완료 
		    	sessionStorage.setItem("activityNum", res.activityNum);
		    	if(sessionStorage["uploadType"] == "PPT") {
			    	getPptInfo2();
		    	} else if (sessionStorage["uploadType"] == "PDF") {
		    		sessionStorage.setItem("ws_mode", "upload");
			    	getWorksheetInfo2();
		    	}
	        }
	        else if(res.MessageNum == 312) {
		        alert("추가성공");
	        }
	        else if(res.MessageNum == 326) {
		        alert("삭제성공");
	        }
	        else if(res.MessageNum == 320) { //워크시트 업로드 성공 
		        sessionStorage.setItem("ws_mode", "complete");
				getWorksheetInfo2();			    
		        
	        }
	        else if(res.MessageNum == 340) {
		        var activityList = new Array();
	        	if(typeof res.activityList != "undefined") {
		        	for(i = 0; i < res.activityList.length;i++) {
        				activityList[i] = new DTO();
		        		activityList[i].actNum = res.activityList[i].actNum;
		        		activityList[i].actName = res.activityList[i].actName;	     
		        	}
		        }
	        	sessionStorage["activityList"] = JSON.stringify(activityList);
	        	location.href = "../submit/activityList.html";
	        }
	        else if(res.MessageNum == 336) {
	        
				var workSheetInfo = new Array();
				if(typeof res.workSheetInfo != "undefined" ) {
					for(i = 0; i < res.workSheetInfo.length ; i++ ) {
						workSheetInfo[i] = new AnswerSpace();

						workSheetInfo[i].startX = res.workSheetInfo[i].startX;
						workSheetInfo[i].startY = res.workSheetInfo[i].startY;
						workSheetInfo[i].width = res.workSheetInfo[i].width;
						workSheetInfo[i].height = res.workSheetInfo[i].height;
						workSheetInfo[i].answer = res.workSheetInfo[i].answer;
					}
				}
		        console.log(workSheetInfo);
		        sessionStorage["workSheetInfo"] = JSON.stringify(workSheetInfo);//331
		        sessionStorage.setItem("ws_mode", "submit");
		        getWorksheetInfo2();


		         
	        }
	});
}//end of connect


function close() {
    console.log("Closing...");
    socket.emit('close');
}