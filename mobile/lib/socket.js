var socket;
var checkConnection=false;
var id;

var CLIENT_REQUEST_LOGIN_TEA=101;
var SERVER_RESPONSE_LOGIN_TEA=102;
var CLIENT_REQUEST_SUBJECTLIST_TEA=103;
var SERVER_RESPONSE_SUBJECTLIST_TEA=104;
var CLIENT_REQUEST_LECTURELIST_TEA=105;
var SERVER_RESPONSE_LECTURELIST_TEA=106;
var CLIENT_REQUEST_MENU_TEA=107;
var SERVER_RESPONSE_MENU_TEA=108;
var CLIENT_REQUEST_STARTFIXACTIVITY_TEA=109;
var SERVER_RESPONSE_STARTFIXACTIVITY_TEA=110;
var CLIENT_REQUEST_CONTENTLIST_TEA=111;
var SERVER_RESPONSE_CONTENTLIST_TEA=112;
var CLIENT_REQUEST_GROUPDECISION_TEA=113;
var SERVER_RESPONSE_GROUPDECISION_TEA=114;
var SERVER_REQUEST_GROUPIN_TEA=115;
var CLIENT_RESPONSE_GROUPIN_TEA=116;
var CLIENT_REQUEST_GROUPINGCOMPLETE_TEA=117;
var SERVER_RESPONSE_GROUPINGCOMPLETE_TEA=118;
var CLIENT_REQUEST_PPTINFO_TEA=119;
var SERVER_RESPONSE_PPTINFO_TEA=120;
var CLIENT_REQUEST_WORKSHEETINFO_TEA=121;
var SERVER_RESPONSE_WORKSHEETINFO_TEA=122;
var SERVER_REQUEST_WORKSHEETPROGRESS_TEA=123;
var CLIENT_RESPONSE_WORKSHEETPROGRESS_TEA=124;
var SERVER_REQUEST_STARTREPRESENTATIONACTIVITY_TEA=125;
var CLIENT_RESPONSE_STARTREPRESENTATIONACTIVITY_TEA=126;
var SERVER_REQUEST_REPRESENTATIONPROGRESS_TEA=127;
var CLIENT_RESPONSE_REPRESENTATIONPROGRESS_TEA=128;
var SERVER_REQUEST_REPRESENTATIONSEND_TEA=129;
var CLIENT_RESPONSE_REPRESENTATIONSEND_TEA=130;
var CLIENT_REQUEST_ATTENDINFO_TEA=131;
var SERVER_RESPONSE_ATTENDINFO_TEA=132;
var SERVER_REQUEST_ATTEND_TEA=133;
var CLIENT_RESPONSE_ATTEND_TEA=134;
var CLIENT_REQUEST_ATTENDSEND_TEA=135;
var SERVER_RESPONSE_ATTENDSEND_TEA=136;
var CLIENT_REQUEST_CONNECTION_TEA=137;
var SERVER_RESPONSE_CONNECTION_TEA=138;
var CLIENT_REQUEST_PPTSHARE_TEA=139;
var SERVER_RESPONSE_PPTSHARE_TEA=140;
var CLIENT_REQUEST_PPTRETREIVE_TEA=141;
var SERVER_RESPONSE_PPTRETREIVE_TEA=142;
var CLIENT_REQUEST_CARDTIMERSTART=143;
var SERVER_RESPONSE_CARDTIMERSTART=144;
var CLIENT_REQUEST_CARDTIMEREND=145;
var SERVER_RESPONSE_CARDTIMEREND=146;
var SERVER_REQUEST_CARDGROUPINFOCHANGE=147;
var CLIENT_RESPONSE_CARDGROUPINFOCHANGE=148;
///////////////////////////////////////////////////////////////////
var CLIENT_REQUEST_LOGIN_STU=201;
var SERVER_RESPONSE_LOGIN_STU=202;
var SERVER_REQUEST_STARTGROUPACTIVITY_STU=203;
var CLIENT_RESPONSE_STARTGROUPACTIVITY_STU=204;
var SERVER_REQUEST_GROUPDECISION_STU=205;
var CLIENT_RESPONSE_GROUPDECISION_STU=206;
var CLIENT_REQUEST_GROUPATTEND_STU=207;
var SERVER_RESPONSE_GROUPATTEND_STU=208;
var SERVER_REQUEST_GROUPIN_STU=209;
var CLIENT_RESPONSE_GROUPIN_STU=210;
var SERVER_REQUEST_GROUPINGCOMPLETE_STU=211;
var CLIENT_RESPONSE_GROUPINGCOMPLETE_STU=212;
var SERVER_REQUEST_STARTWORKSHEETACTIVITY_STU=213;
var CLIENT_RESPONSE_STARTWORKSHEETACTIVITY_STU=214;
var CLIENT_REQUEST_WORKSHEETPROGRESS_STU=215;
var SERVER_RESPONSE_WORKSHEETPROGRESS_STU=216;
var CLIENT_REQUEST_WORKSHEETRESULT_STU=217;
var SERVER_RESPONSE_WORKSHEETRESULT_STU=218;
var SERVER_REQUEST_STARTATTENDACTIVITY_STU=229;
var CLIENT_RESPONSE_STARTATTENDACTIVITY_STU=230;
var CLIENT_REQUEST_ATTEND_STU=231;
var SERVER_RESPONSE_ATTEND_STU=232;
var CLIENT_REQUEST_CONNECTION_STU=233;
var SERVER_RESPONSE_CONNECTION_STU=234;
var SERVER_REQUEST_STARTCARDGAMEACTIVITY=235;
var CLIENT_RESPONSE_STARTCARDGAMEACTIVITY=236;
var SERVER_REQUEST_TURNSTART=237;
var CLIENT_RESPONSE_TURNSTART=238;
var CLIENT_REQUEST_CARDFLIP=239;
var SERVER_RESPONSE_CARDFLIP=240;
var SERVER_REQUEST_CARDFLIPPED=241;
var CLIENT_RESPONSE_CARDFLIPPED=242;
var SERVER_REQUEST_FLIPRESULT=243;
var CLIENT_RESPONSE_FLIPRESULT=244;
var SERVER_REQUEST_CARDGAMEEND=245;
////////////////////////////////////////////////////////////////////




function connect() {
//  connection = new WebSocket("http://lattetime.cafe24.com:9999");
//http://lattetime.cafe24.com:9999/teacher
  // Log errors
 socket = io.connect('http://lattetime.cafe24.com:8888');


 socket.on('data', function (res) {
        
        console.log(res);

        if(res.MessageNum==SERVER_RESPONSE_LOGIN_TEA){
            if(res.is_success==1)
            {
//            alert("반갑습니다 선생님!");
            sessionStorage.setItem('id', res.id);
            sessionStorage.setItem('sort', 'teacher');
            sessionStorage.setItem('teacherId', res.id);

            close();
            location.href="../subject/subject.html";           
            }
            else
            {
            alert("계정을 확인하세요");
            }
        }//end of if 102
        else if(res.MessageNum==SERVER_RESPONSE_LOGIN_STU){
            if(res.is_success==1)
            {
   //         alert("반갑습니다 학생님!");
            sessionStorage.setItem('id', res.id);
            sessionStorage.setItem('sort', 'student');
            sessionStorage.setItem('studentId', res.id);

            close();
            location.href="../learning/learning.html";           
//            location.href="../attendance/stuAttendance.html";           

            }
            else
            {
            alert("계정을 확인하세요");
            }
        }//end of if 202
        else if(res.MessageNum==SERVER_RESPONSE_SUBJECTLIST_TEA)
        {
            if(res.success==1)
            {
            spreadClasses(res);
            }
        }//end of 104
        else if(res.MessageNum==SERVER_RESPONSE_LECTURELIST_TEA)
        {
            if(res.success==1)
            {
//            spreadClasses(res);
//              spreadLectures(res);
//            alert("ahahah");
              showLectures(res);
            }
        }//end of 106
        else if(res.MessageNum==SERVER_REQUEST_STARTATTENDACTIVITY_STU)
        {
        sessionStorage.setItem('thisTimeTeacher', res.id);

        console.log(res);
        location.href="../attendance/stuAttendance.html";           
        }
        else if(res.MessageNum==SERVER_RESPONSE_ATTENDINFO_TEA)
        {
//        alert("what?");
//        console.log(res);
          spreadStudents(res);
          
        }
        else if(res.MessageNum==SERVER_RESPONSE_STARTFIXACTIVITY_TEA)
        {
 //       alert("붙박이 실행!");
        }
        else if(res.MessageNum==SERVER_RESPONSE_ATTEND_STU)
        {
        close();
        location.href="../learning/learning.html";           
        }
        else if(res.MessageNum==SERVER_REQUEST_ATTEND_TEA)
        {
        attend(res);
        }
        else if(res.MessageNum==SERVER_RESPONSE_MENU_TEA)
        {
        showActivity(res);
        }
        else if(res.MessageNum==SERVER_RESPONSE_PPTINFO_TEA)
        {
        showPPT(res);
        }
        else if(res.MessageNum==SERVER_RESPONSE_PPTSHARE_TEA)
        {
//        alert("응답@");
        }
        else if(res.MessageNum==SERVER_RESPONSE_WORKSHEETINFO_TEA)
        {
        showWorksheet(res);
        }
        else if(res.MessageNum==SERVER_REQUEST_STARTWORKSHEETACTIVITY_STU)
        {
        
        console.log(res);
        sessionStorage.setItem('workSheetInfo', JSON.stringify(res));
        location.href="../worksheet/stuWorksheet.html";                   
        }
        else if(res.MessageNum==SERVER_RESPONSE_GROUPDECISION_TEA)
        {
        console.log(res);
        sessionStorage.setItem('groupingInfo', JSON.stringify(res));
  
        location.href="../grouping/grouping.html";                   
        }
        else if(res.MessageNum==SERVER_REQUEST_GROUPDECISION_STU)
        {
        sessionStorage.setItem('groupingInfoForStudent', JSON.stringify(res));
        location.href="../grouping/stuGrouping.html";                   
        }
        else if(res.MessageNum==115)
        {
        addStudent(res);
        }
        else if(res.MessageNum==209)
        {
        addStudent(res);
        }
        else if(res.MessageNum==211)
        {
        location.href="../learning/learning.html";                   
        }
        else if(res.MessageNum==112)
        {
        sorting(res);
        }
        else if(res.MessageNum==123)
        {
        addProgress(res);
        }
        else if(res.MessageNum==218)
        {
            location.href="../learning/learning.html";                   
        }else if(res.MessageNum==SERVER_RESPONSE_CARDTIMERSTART){
//            location.href="../card/cardTeacher.html";              
            countTime();
        }else if(res.MessageNum==SERVER_REQUEST_STARTCARDGAMEACTIVITY){
//            location.href="../card/cardTeacher.html";              
            sessionStorage.setItem('wordInfo', JSON.stringify(res));
            location.href="../card/card.html";                   
        }else if(res.MessageNum==SERVER_REQUEST_FLIPRESULT){

            applyResult(res);

        }else if(res.MessageNum==SERVER_REQUEST_TURNSTART){
            removeUnable();
        }else if(res.MessageNum==SERVER_REQUEST_CARDFLIPPED){
            flipCard(res);
        }else if(res.MessageNum==SERVER_REQUEST_CARDGROUPINFOCHANGE){
            updateLeftProblems(res);
        }else if(res.MessageNum==SERVER_REQUEST_CARDGAMEEND){
            location.href="../learning/learning.html";           
        }


        
});//end of data on

  
}//end of connect




function close() {
    console.log("Closing...");
    socket.emit('close');
}