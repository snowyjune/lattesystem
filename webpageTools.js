
//**************
// Data types
//**************

//Request
exports.newRequest = function(){
    return new Request();
}
function Request(){
    var MessageNum;
    var id;
    var password;
}

//Response
exports.newResponse = function(){
    return new Response();
}
function Response() {
    var MessageNum;
    var id;
    var success;

}

//SubjectInfo      
function SubjectInfo(subjectNum,subjectName,className){
    this.subjectNum = subjectNum; //��� ��ȣ
    this.subjectName = subjectName; //��� �̸�
    this.className = className; //�� �̸�
}
exports.newSubjectInfo = function(subjectNum,subjectName,className){
    return new SubjectInfo(subjectNum,subjectName,className);
}

//LectureInfo
function LectureInfo(lecNum,lecName,lecDate,lecOrder){
    this.lecNum = lecNum;
    this.lecName = lecName;
    this.lecDate = lecDate;
    this.lecOrder = lecOrder;
}
exports.newLectureInfo = function(lecNum,lecName,lecDate,lecOrder){
    return new LectureInfo(lecNum,lecName,lecDate,lecOrder);
}
//ActivityInfo
function ActivityInfo(actImg,actName,actType,actNum){
    this.actImg = actImg;
    this.actName = actName;
    this.actType = actType;
    this.actNum = actNum;
}
exports.newActivityInfo = function(actImg,actName,actType,actNum){
    return new ActivityInfo(actImg,actName,actType,actNum);
}

//Attend Info
function AttendInfo(studentNum,attendance,lectureNum,studentImg,studentId){
    this.studentNum = studentNum;
    this.attendance = attendance;
    this.lectureNum = lectureNum;
    this.studentImg = studentImg;
    this.studentId = studentId;
}
exports.newAttendInfo = function(studentNum,attendance,lectureNum,studentImg,studentId){
    return new AttendInfo(studentNum,attendance,lectureNum,studentImg,studentId);
}

//PPT Info
function PPTInfo(pageNum,routes,actName){
    this.pageNum = pageNum;
    this.routes = routes;
    this.actName = actName;
}
exports.newPPTInfo = function(pageNum,routes,actName){
    return new PPTInfo(pageNum,routes,actName);
}

//PPT route
function PPTRoute(pageNum,route){
    this.pageNum = pageNum;
    this.route = route;
}
exports.newPPTRoute = function(pageNum, route){
	return new PPTRoute(pageNum,route);
}

//Worksheet Info
exports.newWorkSheetInfo = function(){
    return new WorkSheetInfo();
}

function WorkSheetInfo() {
    var routes;
    var pageNum;
    var answerArr;
}

exports.newWorkSheetRoute= function(){
    return new WorkSheetRoute();
}

function WorkSheetRoute(){
    var pageNum;
    var route;
}

exports.newAnswerSpace= function(){
    return new AnswerSpace();
}

function AnswerSpace(){
    var startX;
    var startY;
    var width;
    var height;
    var answer;
    var pageNum;
}

exports.newStudentListInfo= function(){
    return new StudentListInfo( );
}

function StudentListInfo( ){
	var studentId;
	var workSheetAnwerNum;
}


//ActivityListInfo
function ActivityListInfo() {
	var activityName;
	var activityNum;
}
exports.newActivityListInfo = function() {
	return new ActivityListInfo();
}

//User Management Fields
exports.newIdSocekt = function(){
      return new ID_SOCKET_PAIR();
}

function ID_SOCKET_PAIR() {
      var id;
    var socket;
    var deviceType;
    var manType;

}

function CardGameInfo(){
	var actNum;
	var eng;
	var han;
}
exports.newCardGameInfo = function(){
	return new CardGameInfo();
}


exports.TEACHER=1;
exports.STUDENT=2;

exports.MOBILE=1;
exports.WEBPAGE=2;

exports.CLIENT_REQUEST_LOGIN  =  301;
exports.SERVER_RESPONSE_LOGIN=	302;
exports.CLIENT_REQUEST_LOGOUT=	303;
exports.SERVER_RESPONSE_LOGOUT=	304;
exports.CLIENT_REQUEST_CLASSLIST=	305;
exports.SREVER_RESPONSE_CLASSLIST=	306;
exports.CLIENT_REQUEST_VIEWLECTURELIST=	307;
exports.SERVER_RESPONSE_SELECTCLASS=	308;
exports.CLIENT_REQUEST_CLASSORGANIZE=	309;
exports.SERVER_RESPONSE_CLASSORGANIZE=	310;
exports.CLIENT_REQUEST_ADDACTIVITY_TO_LECTURE=	311;
exports.SERVER_RESPONSE_ADDACTIVITY_TO_LECTURE=	312;
exports.CLIENT_REQUEST_PPTLIST=	313;
exports.SERVER_RESPONSE_PPTLIST=	314;
exports.CLIENT_REQUEST_PPTUPLOAD=	315;
exports.SERVER_RESPONSE_PPTUPLOAD=	316;
exports.CLIENT_REQUEST_WORKSHEETLIST=	317;
exports.SERVER_RESPONSE_WORKSHEETLIST=	318;
exports.CLIENT_REQUEST_WORKSHEETUPLOAD=	319;
exports.SERVER_RESPONSE_WORKSHEETUPLOAD	=320;
exports.CLIENT_REQUEST_VIEWATTENDLIST=	321;
exports.SERVER_RESPONSE_VIEWATTENDLIST=	322;
exports.CLIENT_REQUEST_NEWLECTURE=    323;
exports.SERVER_RESPONSE_NEWLECTURE =	324;
exports.CLIENT_REQUEST_DELETE_ACTIVITY_FROM_LECTURE=    325;
exports.SERVER_RESPONSE_DELETE_ACTIVITY_FROM_LECTURE=	326;
exports.CLIENT_REQUEST_ACTIVITY_LIST=    327;
exports.SERVER_RESPONSE_ACTIVITY_LIST=	328;

exports.CLIENT_REQUEST_PPTINFO =    329;
exports.SERVER_RESPONSE_PPTINFO =	 330;
exports.CLIENT_REQUEST_WORKSHEETINFO =    331;
exports.SERVER_RESPONSE_WORKSHEETINFO =	332;

exports.CLIENT_REQUEST_WORKSHEETSTUDENTLIST = 333;
exports.SERVER_RESPONSE_WORKSHEETSTUDENTLIST =334;
exports.CLIENT_REQUEST_WORKSHEETANSWERINFO = 335;
exports.SERVER_RESPONSE_WORKSHEETANSWERINFO =336;
exports.CLIENT_REQUEST_WORKSHEETANSWERLIST = 339;
exports.SERVER_RESPONSE_WORKSHEETANSWERLIST =340;
exports.CLIENT_REQUEST_CONNECTION = 341;
exports.SERVER_RESPONSE_CONNECTION =342;

exports.SERVER_REQUEST_UPLOADCOMPLETE = 337;
exports.CLIENT_RESPONSE_UPLOADCOMPLETE =338;

exports.CLIENT_REQUEST_CARDGAMELIST = 343;
exports.SERVER_RESPONSE_CARDGAMELIST = 344;
exports.CLIENT_REQUEST_CARDGAME_CREATE = 345;
exports.SERVER_RESPONSE_CARDGAME_CREATE = 346;
exports.CLIENT_REQUEST_CARDGAMEINFO = 347;
exports.SERVER_RESPONSE_CARDGAMEINFO = 348;



