/* 301 / 302
	로그인한다.
*/
function login(){
	var query = new DTO();
	query.MessageNum = 301;
	query.id = document.getElementById("id").value;
	query.password = document.getElementById("password").value;
	sessionStorage.setItem("pw",document.getElementById("password").value);
	socket.emit('data', query);
}//end of login


/* 303 / 304
   로그아웃한다.
*/
function logout(){
	var query = new DTO();
	
	query.MessageNum = 303;
	query.id = sessionStorage["id"];
	socket.emit('data', query);
}//end of logout

       
/* 305 / 306
   로그인한 선생님이 맡고있는 수업의 리스트를 받아온다.
*/  
function getSubjectList(){
	sessionStorage.setItem("selMenu", "subject");
	var query = new DTO();
	
	query.MessageNum = 305;
	query.id = sessionStorage["id"];
	socket.emit('data', query);
}//end of get subject list

function getSubmitSubjectList() {
	sessionStorage.setItem("selMenu", "submit");
	var query = new DTO();
	
	query.MessageNum = 305;
	query.id = sessionStorage["id"];
	socket.emit('data', query);
}

/* 307 / 308
   선생님이 맡고있는 수업의 강의 리스트를 리턴받는다. 
   수업의 번호를 넘겨준다.
*/
function getLectureList(subjectNum){
	var query = new DTO();
	
	query.MessageNum = 307;
	query.id = sessionStorage["id"];
	query.subjectNum = subjectNum;
	sessionStorage.setItem('selSubject', subjectNum);//강의만들때 과목정보 필요함
	socket.emit('data', query);
}//end of get lecture list


/* 323 / 324
   새 강의를 구성한다. 단순히 강의를 만들어내는 용도이다. 
   수업의 번호를 넘겨준다.
   만든후 페이지를 리로드해서 새 강의가 추가 된 모습을 보여준다. 
   강의에 컨텐츠 추가는 강의 수정하기를 통해서 진행한다.
*/
function makeNewLecture(lectureName, lectureOrder){//, lectureName, lectureOrder
	
	var query = new DTO();
	/* lectureInfo */
	var lectureInfo2 = new lectureInfo();
	lectureInfo2.lectureName = lectureName;
	lectureInfo2.lectureOrder = lectureOrder;

	query.MessageNum = 323;
	query.id = sessionStorage["id"];
	query.subjectNum = sessionStorage["selSubject"];
	query.lectureInfo = lectureInfo2;
	console.log(query);
	socket.emit('data', query);
}//end of make new list


/* 309 / 310
   강의 수정하기.
   lecture번호를 넘겨준다.
   강의에 추가된 액티비티 리스트를 받아온다.
*/
function modifyLecture(lectureNum, lectureName) {
	var query = new DTO();
	query.MessageNum = 309;
	query.id = sessionStorage["id"];
	query.lectureNum = lectureNum;
	sessionStorage.setItem('selLecture', lectureNum);//강의자료를 추가할때 과목정보 필요함.
	sessionStorage.setItem('selLectureName', lectureName);
	socket.emit('data', query);
}

/* 327 / 328 
   모든 액티비티 리스트 가져오기 
   id만 넘겨준다
*/
function getAllActivityList() {
	var query = new DTO();
	
	query.MessageNum = 327;
	query.id = sessionStorage["id"];
	socket.emit('data', query);
}
/* 321 / 323 
	출석 정보 !!!! 
*/
function getAttendList() {
	var query = new DTO();
	query.MessageNum = 321;
	query.id = sessionStorage["id"];
	query.subjectNum=sessionStorage["selSubject"];
	
	socket.emit('data', query);
}

/* 311 / 312
   강의에 엑티비티 추가하기
*/
function addActivity(activityNum) {
	var query = new DTO();
	query.MessageNum = 311;
	query.id =sessionStorage["id"];
	query.lectureNum = sessionStorage["selLecture"];
	query.activityNum = activityNum;	
	console.log(query);
	socket.emit('data', query);
}

/* 325 / 326 
   강의에 액티비티 삭제 
*/
function deleteActivity(activityNum) {
	var query = new DTO();
	query.MessageNum = 325;
	query.id =sessionStorage["id"];
	query.lectureNum = sessionStorage["selLecture"];
	query.activityNum = activityNum;	
	socket.emit('data', query);
}


/* 313 / 314  
   PPT목록보기
*/
function getPptList() {
	var query = new DTO();
	sessionStorage.setItem("selMenu", "ppt");
	query.MessageNum = 313;
	query.id = sessionStorage["id"];
	socket.emit('data', query);
	
}

/* 313 / 314  
   카드게임 목록보기
*/
function getCardgameList() {
	var query = new DTO();
	sessionStorage.setItem("selMenu", "card");
	query.MessageNum = 343;//////////////////////////////메세지 넘버 교체
	query.id = sessionStorage["id"];
	socket.emit('data', query);
	
}


/* 317 / 318
   worksheet 목록보기
*/
function getWorksheetList() {
	var query = new DTO();
	sessionStorage.setItem("selMenu", "worksheet");
	query.MessageNum = 317;
	query.id = sessionStorage["id"];
	console.log(query);
	socket.emit('data', query);	
}

/* 329 330
   피피티 정보 요청
*/
function getPptInfo2() {
	sessionStorage.setItem("uploadState","YES");
	sessionStorage.setItem("VIEW_PPT","YES");

	var query = new DTO();
	query.MessageNum = 329;
	query.id = sessionStorage["id"];
	query.activityNum = sessionStorage["activityNum"];
	socket.emit('data', query);
}

/* 331 332
   워크시트 정보 요청
*/
function getWorksheetInfo2() {
	sessionStorage.setItem("uploadState","YES");
	var query = new DTO();
	query.MessageNum = 331;
	query.id = sessionStorage["id"];
	query.activityNum = sessionStorage["activityNum"];
	console.log(query);
	socket.emit('data', query);
}

/* 329 330
   피피티 정보 요청
*/
function getPptInfo(activityNum) {
	sessionStorage.setItem("uploadState","YES");
	sessionStorage.setItem("VIEW_PPT","YES");

	var query = new DTO();
	query.MessageNum = 329;
	query.id = sessionStorage["id"];
	query.activityNum = activityNum;
	socket.emit('data', query);
}

/* 331 332
   워크시트 정보 요청
*/
function getWorksheetInfo(activityNum) {
	sessionStorage.setItem("uploadState","YES");
	var query = new DTO();
	query.MessageNum = 331;
	query.id = sessionStorage["id"];
	query.activityNum = activityNum;
	console.log(query);
	socket.emit('data', query);
}

/* 341 / 342 
   커넥션 연결
   */
function connectAfterUpload() {
	var query = new DTO();
	query.id = sessionStorage["id"];
	query.MessageNum = 341;
	socket.emit('data', query);
}

function selPptImg(imgNum) {
	sessionStorage.setItem("selPptImg", imgNum);
	location.href = "../upload/ppt_preview2.html";

}

function makeWorksheet() { //
	var query = new DTO();
    query.MessageNum = 344;
    query.id = sessionStorage["id"];
    query.activityNum = sessionStorage["activityNum"];
	socket.emit('data', query);    
}

/*
	339 /340
	과목정보를 주고 액티비티 목록을 받아온다
*/
function getSubmitActivityList(subjectNum) {
	var query = new DTO();
	query.id = sessionStorage["id"];
	query.subjectNum = subjectNum;
	query.MessageNum = 339;
	socket.emit('data', query);
}

/*
	333 /334
	액티비티 주고 학생목록 받아옴 
*/
function getSubmitStudentList(activityNum) {
	var query = new DTO();
	sessionStorage.setItem("activityNum", activityNum);
	query.id = sessionStorage["id"];
	query.activityNum = activityNum;
	query.MessageNum = 333;
	socket.emit('data', query);
}


function getSubmitAnswerList(workSheetAnswerNum) {
	var query = new DTO();
	query.id = sessionStorage["id"];
	query.workSheetAnswerNum = workSheetAnswerNum;
	query.MessageNum = 335;
	console.log(query);
	socket.emit('data', query);
	
}

