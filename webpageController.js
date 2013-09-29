//**************
// Data types
//**************

var ID_SOCKET_PAIR = [];//Logged id user list
var mysqlConn; 
var socket;
var WebpageTools = require("./webpageTools");


//*********************
// Main Logic Function
//*********************

exports.call = function(_socket, received, mysqlConnection, _ID_SOCKET_PAIR){
	 
    ID_SOCKET_PAIR = _ID_SOCKET_PAIR; 
    mysqlConn = mysqlConnection;
    socket = _socket;
    
	console.log("web page controller call function");
	console.log("jason : %j", received);

	//MessageNum���곕씪��遺꾧린 - 媛곴컖��泥섎━��留욌뒗 �⑥닔 �몄텧
    switch( parseInt(received.MessageNum, 10) ){
        case WebpageTools.CLIENT_REQUEST_LOGIN: //301
            clientRequestLogin(received);
            break;
        case WebpageTools.CLIENT_REQUEST_LOGOUT: //303
            clientRequestLogout(received);
            break;
        case WebpageTools.CLIENT_REQUEST_CLASSLIST: //305
            clientRequestClasslist(received);
            break;
        case WebpageTools.CLIENT_REQUEST_VIEWLECTURELIST: //307 
            ClientRequestViewLectureList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_CLASSORGANIZE: //309
            ClientRequestClassOrganize(received);
            break;
        case WebpageTools.CLIENT_REQUEST_ADDACTIVITY_TO_LECTURE: //311
            ClientRequestAddActivityToLecture(received);
            break;
        case WebpageTools.CLIENT_REQUEST_DELETE_ACTIVITY_FROM_LECTURE: //325
            ClientRequestDeleteActivityFromLecture(received);
            break;
        case WebpageTools.CLIENT_REQUEST_PPTLIST: //313
            ClientRequestPptList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_PPTUPLOAD: //315
            break;
        case WebpageTools.CLIENT_REQUEST_WORKSHEETLIST: //317
            ClientRequestWorksheetList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_VIEWATTENDLIST: //321
            ViewAttendList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_NEWLECTURE : //323
            ClientRequestNewLecture(received);
            break;
        case WebpageTools.CLIENT_REQUEST_ACTIVITY_LIST: //327
            ClientRequestActivityList(received);
            break;
               
            
        case WebpageTools.CLIENT_REQUEST_PPTINFO: //329
        	ClientRequestPptInfo(received);
            break;    
        case WebpageTools.CLIENT_REQUEST_WORKSHEETINFO: //331
        	ClientRequestWorksheetInfo(received);
            break;  
        
        case WebpageTools.CLIENT_REQUEST_WORKSHEETSTUDENTLIST: //333
        	ClientRequestWorksheetStudentList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_WORKSHEETANSWERINFO: //335
        	ClientRequestWorksheetAnswerInfo(received);
            break;     
        case WebpageTools.CLIENT_REQUEST_WORKSHEETANSWERLIST: //339
        	ClientRequestWorksheetAnswerList(received);
            break;     
            
        case WebpageTools.CLIENT_REQUEST_CONNECTION: //341
        	ClientRequestConnection(received);
            break;     
            
        case WebpageTools.CLIENT_REQUEST_WORKSHEETUPLOAD: //319
        	ClientRequestWorkSheetUpload(received);
            break;      
        case WebpageTools.exports.CLIENT_REQUEST_CARDGAMELIST :
        	ClientRequestCardgameList(received);
        	break;
       	case WebpageTools.CLIENT_REQUEST_CARDGAME_CREATE : 
       		ClientRequestCardgameCreate(received);
       		break;
       	case WebpageTools.CLIENT_REQUEST_CARDGAMEINFO :
       		ClientRequestCardgameInfo(received);
       		break;
            
        default:
            break;
	}

}

//**************
// Functions
//**************

// LOGIN
function clientRequestLogin(received){
    
    console.log( "fuction clientRequestLogin " );
    
    var res = WebpageTools.newResponse();
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_LOGIN;
    
    res.id = received.id;
    res.success = 1; //蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎. 
    res.is_success = 0; //is_success ��濡쒓렇�몄쓣 �깃났�덈뒗媛��대떎. 
    
    var query = "select teacherPw,teacherNum from latte_teacher where teacherId = '"+received.id+"'";
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
   
         console.log( " rrrr : "+rows[0].teacherPw);
         
         if( received.password == rows[0].teacherPw){
             res.is_success = 1;
         }
    }
    
    //寃곌낵��留덉씠�먯뒪�먯뿕源뚯� �앸궃 �ㅼ쓬 諛섑솚�쒕떎. 
    //寃곌낵 蹂대궡湲�
        socket.emit('data', res) ;
    });
    
}

// LOGOUT
function clientRequestLogout(received){
    var res = WebpageTools.newResponse();
    
    res.id = received.id;
    res.success = 1; //蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎. 
    res.is_success = 1; //send success
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_LOGOUT;
    
    //send response
    socket.emit('data',res);   
    
    //pop from the list
    for(var i = 0 ; i <  ID_SOCKET_PAIR.length ; i++){
        if(ID_SOCKET_PAIR[i].id == received.id){
          if( ID_SOCKET_PAIR[i].deviceType = WebpageTools.WEBPAGE){
              ID_SOCKET_PAIR.splice(i, 1);
          }
        }
    }
    
    
}

// CLASS LIST
function clientRequestClasslist(received){
    
    var res = WebpageTools.newResponse();
    var list =[];
    res.MessageNum = WebpageTools.SREVER_RESPONSE_CLASSLIST;
    res.id = received.id;
    res.success = 1; //蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎. 
    var query = "select subjectNum, subjectName, subjectClass " 
                + " from latte_subject "
                + " where subjectNum in " 
                + " (select subjectNum from latte_teach where teacherNum = " 
                + " (select teacherNum from latte_teacher where teacherId = '" + received.id + "') ); ";
    
    mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push

                list.push(WebpageTools.newSubjectInfo(rows[i].subjectNum
                                                    ,rows[i].subjectName
                                                    ,rows[i].subjectClass));
            }         
            
            res.success = 1;
            res.subjectList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
}

// LECTURE LIST
function ClientRequestViewLectureList(received){
    var res = WebpageTools.newResponse(); 
    var list = [];
    res.MessageNum = WebpageTools.SERVER_RESPONSE_SELECTCLASS;
    res.id = received.id;
    res.success = 1; //蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎. 
    
    var query = "select latte_lecture.lectureNum, latte_lecture.lectureName, latte_lecture.lectureOrder "
                + " from latte_lecture left join latte_subject "
                + " on latte_lecture.subjectNum = latte_subject.subjectNum " 
                + " where latte_lecture.subjectNum = " + received.subjectNum;

        mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
              
              list.push(WebpageTools.newLectureInfo(rows[i].lectureNum
                                                    ,rows[i].lectureName
                                                    ,0
                                                    ,rows[i].lectureOrder));
            }         
            
            res.success = 1;
            res.lectureList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
}

// CLASS ORGINIZE
function ClientRequestClassOrganize(received){
    
    var res = WebpageTools.newResponse();
    var list = [];
    res.MessageNum = WebpageTools.SERVER_RESPONSE_CLASSORGANIZE;
    res.id = received.id;
    
     var query = "select activityNum, activityName, activityType, activityRoute "
                    + " from latte_activity "
                    + " where activityNum in " 
                    + " (select activityNum from latte_lecture_activity where lectureNum = "
                    + " (select lectureNum from latte_lecture where lectureNum = " +received.lectureNum  + ")); " ;
    
     mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
             
                list.push(WebpageTools.newActivityInfo(rows[i].activityRoute
                                                        ,rows[i].activityName
                                                        ,rows[i].activityType
                                                        ,rows[i].activityNum));
            }         
            
            res.success = 1;
            res.activityList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
    
}

// ADD ACTIVITY TO LECTURE - attach activities
function ClientRequestAddActivityToLecture(received){
    var res = WebpageTools.newResponse();
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_ADDACTIVITY_TO_LECTURE;
    res.id = received.id;

    //DB insertion
    //  -latte-lecture activity
   /* var query = "insert into latte_lecture_activity (lectureNum, activityNum) select "+ received.lectureNum +"," +received.activityNum
                +" from latte_lecture_activity where not exists " 
                + " (select * from latte_lecture_activity where lectureNum = " +  received.lectureNum + " and activityNum = " + received.activityNum + ") limit 1";
    */
      var query = "insert into latte_lecture_activity(lectureNum, activityNum) values (" + received.lectureNum+ "," + received.activityNum+" )";
     
    
     console.log(query);
    
    mysqlConn.query(query, function(err, rows) {
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else{
            res.success = 1;
        }
        
        //send result to client
        socket.emit('data', res) ;
    
    });
    
}

// DELETE ACTIVITY FROM LECTURE - dettach activities
function  ClientRequestDeleteActivityFromLecture(received){
    var res = WebpageTools.newResponse();
     
    res.MessageNum = WebpageTools.SERVER_RESPONSE_DELETE_ACTIVITY_FROM_LECTURE;
    res.id = received.id;
    
    //DB deletion
    var query = "delete from latte_lecture_activity where lectureNum = " + received.lectureNum + " and activityNum = " + received.activityNum;
    
     console.log(query);
    
     mysqlConn.query(query, function(err, rows) {
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else{
            res.success = 1;
        }
        
        //send result to client
        socket.emit('data', res) ;
    
    });
}

// VIEW ATTENDLIST
function ViewAttendList(received){

    var res = WebpageTools.newResponse();
    var list = [];
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_VIEWATTENDLIST;
    
    var query = " select studentNum,attendance,lectureNum, studentId,studentImg "
                + " from "
                + " (select latte_attendInfo.studentNum,latte_attendInfo.attendance,latte_attendInfo.lectureNum, latte_student.studentId,latte_student.studentImg "
                + " from latte_student,latte_attendInfo "
                + " where latte_student.studentNum = latte_attendInfo.studentNum) as t1 "
                + " where lectureNum in "
                + " (select lectureNum from latte_lecture where subjectNum = " + received.subjectNum +") order by studentId, lectureNum ";

    
    
     mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
                
                //studentNum,attendence,lectureNum,studentImg,studentId
                list.push(WebpageTools.newAttendInfo(rows[i].studentNum
                                                    , rows[i].attendance
                                                    , rows[i].lectureNum
                                                    , rows[i].studentImg
                                                    , rows[i].studentId));
            }         
            
            res.success = 1;
            res.attendInfo = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
    
}
// CREATE NEW LECTURE
function ClientRequestNewLecture(received){
    var res = WebpageTools.newResponse();
    res.MessageNum = WebpageTools.SERVER_RESPONSE_NEWLECTURE;
    
    var query = "insert into latte_lecture(lectureName,lectureOrder,subjectNum)"
                + " values('" + received.lectureInfo.lectureName + "'," 
                + received.lectureInfo.lectureOrder + ", " 
                + received.subjectNum+")";
    
    mysqlConn.query(query, function(err, rows) {
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else{
            res.success = 1;
        }
        
        //send result to client
        socket.emit('data', res) ;
    
    });
}

// VIEW ACTIVITY LIST
function ClientRequestActivityList(received){
    
    var res = WebpageTools.newResponse();
    var list = [];
    res.MessageNum = WebpageTools.SERVER_RESPONSE_ACTIVITY_LIST;
    res.id = received.id;
    
     var query = "select activityNum, activityName, activityType, activityRoute "
                    + " from latte_activity "
                    + " where activityNum in " 
                    + " (select activityNum from latte_have where teacherNum= "
                    + " (select teacherNum from latte_teacher where teacherId = '"+received.id+"')); " ;
    
     mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
             
                list.push(WebpageTools.newActivityInfo(rows[i].activityRoute
                                                        ,rows[i].activityName
                                                        ,rows[i].activityType
                                                        ,rows[i].activityNum));
            }         
            
            res.success = 1;
            res.activityList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
}


//VIEW PPT LIST
 function ClientRequestPptList(received){
    
    var res = WebpageTools.newResponse();
    var list = [];
    res.MessageNum = WebpageTools.SERVER_RESPONSE_PPTLIST;
    res.id = received.id;
    
    var query = "select activityName, activityNum from latte_activity"
  + " where "
 + " activityNum in (select activityNum from latte_have"
 + " where teacherNum = (select teacherNum from latte_teacher"
 + " where teacherId = '" + received.id + "' )"
 + " )"
 + " and activityType = 'PPT'" ; 
        
        mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length ) {
            var tempList = [];
           console.log( " rows : %j", rows);
           for( var i=0 ; i< rows.length ;  i++){
               tempList[i] = WebpageTools.newActivityListInfo();
                tempList[i].activityName = rows[i].activityName;
                tempList[i].activityNum = rows[i].activityNum;
                    
                console.log( " tempList[i].activityName : "+ tempList[i].activityName );
                console.log( "tempList[i].route  : "+ tempList[i].activityNum );   
            }
        }  
        
           res.pptList = tempList;
        
        //寃곌낵��留덉씠�먯뒪�먯뿕源뚯� �앸궃 �ㅼ쓬 諛섑솚�쒕떎. 
     
             //寃곌낵 蹂대궡湲�
            socket.emit('data', res) ;
            
           
            
        });
     
 }
 
 
 //VIEW WORKSHEET LIST
 function ClientRequestWorksheetList(received){
	  var res = WebpageTools.newResponse();
	    var list = [];
	    res.MessageNum = WebpageTools.SERVER_RESPONSE_WORKSHEETLIST;
	    res.id = received.id;
	    
	    var query = "select activityName, activityNum from latte_activity"
	    	  + " where "
	    	 + " activityNum in (select activityNum from latte_have"
	    	 + " where teacherNum = (select teacherNum from latte_teacher"
	    	 + " where teacherId = '" + received.id + "' )"
	    	 + " )"
	    	 + " and activityType = 'WORKSHEET'" ; 
	    	        
	    	        mysqlConn.query(query, function (err, rows){
	    	        if(err){
	    	            console.log("mysql query err");
	    	            console.log(err);
	    	            res.success = 0;
	    	        }
	    	        
	    	        else if( rows.length ) {
	    	            var tempList = [];
	    	           console.log( " rows : %j", rows);
	    	           for( var i=0 ; i< rows.length ;  i++){
	    	               tempList[i] = WebpageTools.newActivityListInfo();
	    	                tempList[i].activityName = rows[i].activityName;
	    	                tempList[i].activityNum = rows[i].activityNum;
	    	                    
	    	                console.log( " tempList[i].pageNum : "+ tempList[i].activityName );
	    	                console.log( "tempList[i].route  : "+ tempList[i].activityNum );   
	    	            }
	    	        }  
	    	        
	    	           res.workSheetList = tempList;
	    	        
	    	        //寃곌낵��留덉씠�먯뒪�먯뿕源뚯� �앸궃 �ㅼ쓬 諛섑솚�쒕떎. 
	    	     
	    	             //寃곌낵 蹂대궡湲�
	    	            socket.emit('data', res) ;
	    	            
	    	           
	    	            
	   });
 }
 

 //Request ppt info
 function ClientRequestPptInfo(received){
	  var res = WebpageTools.newResponse();
	    var list = [];
	    res.MessageNum = WebpageTools.SERVER_RESPONSE_PPTINFO;
	    res.id = received.id;
	    
	    //PPT Info瑜�媛�졇��꽌 122濡�蹂대궡以�떎. 
	    
	    var query = "select pptNum, route from latte_ppt "
	    + " where activityTypeNum =  "
	    + " ( select activityTypeNum from latte_activity "
	    + " where activityNum =  " +  received.activityNum  + " )  ; "
	    
	    mysqlConn.query(query, function (err, rows){
	    if(err){
	        console.log("mysql query err");
	        console.log(err);
	        res.success = 0;
	    }
	    
	    else if( rows.length ) {
	        var tempList = [];
	       console.log( " rows : %j", rows);
	       for( var i=0 ; i< rows.length ;  i++){
	           tempList[i] = WebpageTools.newPPTRoute(
	        		   rows[i].pptNum, 
	        		   rows[i].route
	        		   );
	                
	            console.log( " tempList[i].pageNum : "+ tempList[i].pageNum );
	            console.log( "tempList[i].route  : "+ tempList[i].route );   
	        }
	    }  
	    
	       res.pptInfo = WebpageTools.newPPTInfo();
	        res.pptInfo.routes = tempList;
	        res.pptInfo.pageNum = tempList.length;
	    
	    //寃곌낵��留덉씠�먯뒪�먯뿕源뚯� �앸궃 �ㅼ쓬 諛섑솚�쒕떎. 
	 
	         //寃곌낵 蹂대궡湲�
	        socket.emit('data', res) ;
	        
	       
	        
	    });
 }
 
 

 //VIEW WORKSHEET LIST
 function ClientRequestWorksheetInfo(received){
	  var res = WebpageTools.newResponse();
	    var list = [];
	    res.MessageNum = WebpageTools.SERVER_RESPONSE_WORKSHEETINFO;
	    res.id = received.id;
	    
	    var query = "select worksheetNum, route from latte_worksheet "
	    	  + "  where activityTypeNum =  "
	    	  + " ( select activityTypeNum from latte_activity "
	    	  + " where activityNum =   " + received.activityNum + "  )  ; "
	    	    
	    	    mysqlConn.query(query, function (err, rows){
	    	    if(err){
	    	        console.log("mysql query err");
	    	        console.log(err);
	    	        res.success = 0;
	    	    }
	    	    
	    	    else if( rows.length ) {
	    	        var tempList = [];
	    	       console.log( " rows : %j", rows);
	    	       for( var i=0 ; i< rows.length ;  i++){
	    	           tempList[i] = WebpageTools.newWorkSheetRoute();
	    	            tempList[i].pageNum = rows[i].worksheetNum;
	    	            tempList[i].route = rows[i].route;
	    	                
	    	            console.log( " tempList[i].pageNum : "+ tempList[i].pageNum );
	    	            console.log( "tempList[i].route  : "+ tempList[i].route );   
	    	        }
	    	    }  
	    	    
	    	    
	    			    var query2 = "select startX, startY, width, height, answer, slideNum from latte_worksheet_blank"
	    							+	 "  where activityTypeNum = "
	    							+	"  ( select activityTypeNum from latte_activity"
	    							+ "	 where activityNum =   " + received.activityNum + "  )  ";
	    			
	    			    
	    			    mysqlConn.query(query2, function (err, rows){
	    			    if(err){
	    			        console.log("mysql query err");
	    			        console.log(err);
	    			        res.success = 0;
	    			    }
	    			    
	    			    else if( rows.length ) {
	    			        var tempList2 = [];
	    			       console.log( " rows : %j", rows);
	    			       for( var i=0 ; i< rows.length ;  i++){
	    			           tempList2[i] = WebpageTools.newAnswerSpace();
	    			            tempList2[i].startX = rows[i].startX ;
	    			            tempList2[i].startY = rows[i].startY;
	    			            tempList2[i].width = rows[i].width;
	    			            tempList2[i].height = rows[i].height;
	    			            tempList2[i].answer = rows[i].answer;
	    			            tempList2[i].pageNum = rows[i].slideNum;
	    			                
	    			            console.log( " tempList2[i].startX : "+ tempList2[i].startX );
	    			            console.log( "tempList2[i].startY  : "+ tempList2[i].startY );   
	    			            console.log( "tempList2[i].width  : "+ tempList2[i].width );   
	    			            console.log( "tempList2[i].height  : "+ tempList2[i].height );   
	    			            console.log( "tempList2[i].answer  : "+ tempList2[i].answer );   
	    			            console.log( "tempList2[i].pageNum  : "+ tempList2[i].pageNum );   
	    			            
	    			        }
	    			    }  
	    			    
	    			    res.workSheetInfo = WebpageTools.newWorkSheetInfo();
	    			    res.workSheetInfo.routes = tempList;
	    			    res.workSheetInfo.pageNum = tempList.length;
	    			    res.workSheetInfo.answerArr = tempList2;
	    			
	    			     //寃곌낵 蹂대궡湲�
	    			    socket.emit('data', res) ;
	    			    
	    	    
	    	    });
	    	     
	    	        
	    	    });
 }
 

//CONNECTION
function ClientRequestConnection(received){
  
  console.log( "fuction ClientRequestConnection " );
  
  var res = WebpageTools.newResponse();
  
  res.MessageNum = WebpageTools.SERVER_RESPONSE_CONNECTION;
  
  res.id = received.id;
  res.success = 1; //蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎. 

  
      socket.emit('data', res) ;

}



//WORKSHEET ANSWER LIST
function ClientRequestWorksheetAnswerList(received){
 
 var res = WebpageTools.newResponse();
 var list = [];
 res.MessageNum = WebpageTools.SERVER_RESPONSE_WORKSHEETANSWERLIST;
 res.id = received.id;
 
  var query = "select activityName, activityNum " 
  + " from latte_activity"
  + " where activityNum in "
 + " ( select activityNum from latte_worksheet_answer "
  + " where subjectNum = " + received.subjectNum + ") ";
   
  mysqlConn.query(query, function (err, rows){
     if(err){
         console.log("mysql query err");
         console.log(err);
         res.success = 0;
     }
     
     else if( rows.length > 0 ) {
         
         for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
          
             list.push(WebpageTools.newActivityInfo(
            		 0
                     ,rows[i].activityName
                     ,0
                      ,rows[i].activityNum));
         }         
         
         res.success = 1;
         res.activityList = list;
     }
     //send to client
     socket.emit('data', res) ;
 });
}



var cnt=0;

function ClientRequestWorkSheetUpload(received){
    
    console.log( "fuction clientRequestWorkSheetResult " );
    
    var res = WebpageTools.newResponse();
    res.MessageNum = WebpageTools.SERVER_RESPONSE_WORKSHEETUPLOAD;
    res.id = received.id;
    res.success = 1; //蹂꾩씪 �놁쑝硫��붿껌���깃났�쒕떎. 
  
    //DB insertion

    var query;
    
    for( var i=0 ; i<received.workSheetInfo.answerArr.length ; i++){
  
    	query = "insert into latte_worksheet_blank "
 + " (activityTypeNum, slideNum, startX, startY, width, height, answer)"
 + " select activityTypeNum, " 
 + received.workSheetInfo.answerArr[i].pageNum 
 + ", "+  received.workSheetInfo.answerArr[i].startX  
 + ", "+  received.workSheetInfo.answerArr[i].startY 
 + ",  " + received.workSheetInfo.answerArr[i].width 
 + ", "  + received.workSheetInfo.answerArr[i].height  
 + ", '" + received.workSheetInfo.answerArr[i].answer
 + "'"
 + " from latte_activity where activityNum = " + received.activityNum ;

        		     console.log(query);
        		    
        		    mysqlConn.query(query, function(err, rows) {  
        		    	if(err){
        		        console.log("mysql query err");
        		        console.log(err);
        		       
        		    } 
        		    	else{
        		    		cnt++;
        		           if( cnt == ( received.workSheetInfo.answerArr.length )){        		        	    
        		        	    //send result to client
        		        	    socket.emit('data', res) ;
        		        	    cnt=0;
        		           }   
        		           
        		        }
        		    });
    }          
        
   
}
 

//WORKSHEET ANSWER LIST
function ClientRequestWorksheetStudentList(received){
 
 var res = WebpageTools.newResponse();
 var list = [];
 res.MessageNum = WebpageTools.SERVER_RESPONSE_WORKSHEETSTUDENTLIST;
 res.id = received.id;
 
  var query = "select worksheetAnswerNum, studentId from latte_worksheet_answer"
               + " where activityNum = " + received.activityNum  ;
   
  console.log(query);
  
  mysqlConn.query(query, function (err, rows){
     if(err){
         console.log("mysql query err");
         console.log(err);
         res.success = 0;
     }
     
     else if( rows.length > 0 ) {
    	 
    	 console.log(rows);
         
         for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
           list[i] = WebpageTools.newStudentListInfo();
           list[i].studentId =  rows[i].studentId;
           list[i].workSheetAnwerNum =  rows[i].worksheetAnswerNum;
           
         }         
         
         res.success = 1;
         res.studentList = list;
     }
     //send to client
     socket.emit('data', res) ;
 });
}

//WORKSHEET ANSWER LIST
function ClientRequestWorksheetAnswerInfo(received){
 
 var res = WebpageTools.newResponse();
 var list = [];
 res.MessageNum = WebpageTools.SERVER_RESPONSE_WORKSHEETANSWERINFO;
 res.id = received.id;
 
  var query = "select slideNum, startX, startY, width, height, answer from latte_worksheet_answer_blank"
          + " where worksheetAnswerNum = " + received.workSheetAnswerNum ;
   
  console.log(query);
  
  mysqlConn.query(query, function (err, rows){
     if(err){
         console.log("mysql query err");
         console.log(err);
         res.success = 0;
     }
     
     else if( rows.length > 0 ) {
    	 
    	 console.log(rows);
         
         for(var i = 0 ; i < rows.length ; i++){ //寃곌낵 -  for臾��뚮㈃��list��push
           list[i] = WebpageTools.newAnswerSpace();
           list[i].pageNum =  rows[i].slideNum;
           list[i].startX =  rows[i].startX;
           list[i].startY =  rows[i].startY;
           list[i].width =  rows[i].width;
           list[i].height =  rows[i].height;
           list[i].answer =  rows[i].answer;
           
         }         
         
         res.success = 1;
         res.workSheetInfo = list;
     }
     //send to client
     socket.emit('data', res) ;
 });
}

function ClientRequestCardgameList(received){
	 var res = WebpageTools.newResponse();
	 res.MessageNum = WebpageTools.SERVER_RESPONSE_CARDGAMELIST;
	 res.id = received.id;
	 var list = [];
	  var query = "select * from latte_activity
					+ " where activityNum in (select activityNum from latte_have"
					+ " where teacherNum = (select teacherNum from latte_teacher "
					+ " where teacherId = '"+ received.id + "' )"
					+ " ) "
					+ " and activityType = 'CARDGAME' ; ";
	   
	  mysqlConn.query(query, function (err, rows){
	     if(err){
	         console.log("mysql query err");
	         console.log(err);
	         res.success = 0;
	     }
	     
	     else if( rows.length > 0 ) {
	         
	         for(var i = 0 ; i < rows.length ; i++){ 
	          
	             list.push(WebpageTools.newActivityInfo(
	            		 rows[i].activityRoute
	                     ,rows[i].activityName
	                     ,rows[i].activityType
	                     ,rows[i].activityNum));
	         }         
	         
	         res.success = 1;
	         res.activityList = list;
	     }
	     //send to client
	     socket.emit('data', res) ;
	 });
}

function ClientRequestCardgameCreate(received){
	 var res = WebpageTools.newResponse();
	 res.MessageNum = WebpageTools.CLIENT_REQUEST_CARDGAME_CREATE ;
	 res.id = received.id;

	  var query = "insert into latte_activity(activityType, activityTypeNum, activityName, activityRoute)"
	  				+ "values('CARDGAME',3, '"+ received.activityName +"' ,'http://lattetime.cafe24.com:9998/activity_cardgame.png')" ;
	   
	  mysqlConn.query(query, function (err, rows){
	     if(err){
	         console.log("mysql query err");
	         console.log(err);
	         res.success = 0;
	     }
	     var activityNum = rows.insertId ;
		 var have_query = "insert into latte_have(teacherNum,activityNum) "
							+ " values( (select teacherNum from latte_teacher where teacherID='" + received.id + "'), "+ activityNum +");";
		
		mysqlConn.query(have_query, function (err, rows){
	     	
	     	var cardgame_query = "insert into latte_cardgame_word(activityNum, han, eng) values ?";
	     	var values = [];
	     	for(var i = 0 ; i < received.cardInfo.length ; i++){
	     		values[i] = [received.activityNum,rows[i].han,rows[i].eng];
	     	}
	     	
	     	mysqlConn.query(cardgame_query,[values] ,function (err, rows){
		     	//send to client
		     	res.success = 1;
		     	socket.emit('data', res) ;
	     	});	
	 	});	
	 });		
}

function ClientRequestCardgameInfo(received){
	 var res = WebpageTools.newResponse();
	 res.MessageNum = WebpageTools.CLIENT_REQUEST_CARDGAMEINFO ;
	 res.id = received.id;
	 var list = [];
	  var query = "select * from latte_cardgame_word where activityNum = " + received.activityNum + ";";
	   
	  mysqlConn.query(query, function (err, rows){
	     if(err){
	         console.log("mysql query err");
	         console.log(err);
	         res.success = 0;
	     }
	     
	     else if( rows.length > 0 ) {
	         
	         for(var i = 0 ; i < rows.length ; i++){ 
	          
	             var item = WebpageTools.newCardGameInfo();
	             item.actNum = received.activityNum;
	             item.eng = rows[i].eng;
	             item.han = rows[i].han;
	         	
	         	 list.push(item);
	         }         
	         
	         res.success = 1;
	         res.cardInfo = list;
	     }
	     //send to client
	     socket.emit('data', res) ;
	 });	
}
 