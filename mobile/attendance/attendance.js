var studentList;

function setVerticalMiddle(table,cell,target){

$(table).css("display","table");
$(table).css("height","100%");
$(table).css("width","100%");
$(table).css("overflow","hidden");
$(table).css("text-align","center");

$(cell).css("top","50%");
$(cell).css("display","table-cell");
$(cell).css("vertical-align","middle");

$(target).css("position","relative");
$(target).css("top", "-50%");

 
}

function setting(){
var classNumber=sessionStorage.getItem('classNumber');

var query=new DTO();
query.MessageNum=CLIENT_REQUEST_ATTENDINFO_TEA;
//alert(id);
var myId = sessionStorage.getItem('id');
query.id=myId;
query.subjectNum=classNumber;

socket.emit('data', query);


/*  
var studentList=new Array();

for(i=0;i<100;i++)
{
  var tempStudent=new StudentInfo();
  tempStudent.image="./nathan.jpg";
  tempStudent.name="À¯¿µÈ­"
  tempStudent.number=i;

  studentList[i]=tempStudent;
}
 
var i=0;
for(i=0;i<10;i++)
{
var temp='<div '+'id="'+studentList[i].number+'" onClick="javascript:changeAttendanceState('+"'"+studentList[i].number+"'"+');"' +' style="margin-left:10; margin-top:10; background-color:#FF6666; height:160; width:140; display:inline-block;">'+
'<img src="'+studentList[i].image+'" style="height:100; margin-top:10; margin-bottom:0"></img>'+
'<p style="margin-top:3;">'+studentList[i].name+'<br>'+studentList[i].number+'</p>'+
'</div>';
$("#attendance_book").append(temp);
}//end of loop
    
*/


}//end of setting

function spreadStudents(res){
studentList=new Array();
console.log(res);
var i=0;
for(i=0;i<res.attendInfo.length;i++)
{
  var tempStudent=new StudentInfo();
  tempStudent.image=res.attendInfo[i].studentImg;
  tempStudent.number=i;
  tempStudent.studentNum=res.attendInfo[i].studentNum;  
  tempStudent.attendance=0;
  tempStudent.name=res.attendInfo[i].studentId;
  studentList[i]=tempStudent;
}

var i=0;
for(i=0;i<res.attendInfo.length;i++)
{
var temp='<div '+'id="'+studentList[i].number+'" onClick="javascript:changeAttendanceState('+"'"+studentList[i].number+"'"+');"' +' style="margin-left:10; margin-top:10; background-color:white; height:175; width:165; display:inline-block;">'+
'<img src="'+studentList[i].image+'" style="float:left; width:90; height:120; margin-left:10; margin-top:10; margin-bottom:0"></img>'+
'<img src="./image/ribbon_absent.png" id="ribbon'+studentList[i].number+'" style="float:left; margin-left:10; margin-top:10; height:120; width:50;"></img>'+
'<img src="./image/student_name.png" style=margin-left:10; height:120; width:50;"></img>'+
'<p style="margin-top:-26;">'+studentList[i].name+'</p>'+
'</div>';
$("#attendance_book").append(temp);
}//end of loop



var query=new DTO();
query.MessageNum=CLIENT_REQUEST_STARTFIXACTIVITY_TEA;
//order students mobile client to move to attendanve activity
//alert(id);
var myId = sessionStorage.getItem('id');
query.id=myId;
query.activityType="ATTENDANCE";
socket.emit('data', query);

}//end of function spreadStudents

function changeAttendanceState(a)
{
var number=parseInt(a, 10);
var targetId="#ribbon"+a;

studentList[number].attendance++;
if(studentList[number].attendance>2)
 studentList[number].attendance=0;


if(studentList[number].attendance==1)
  $(targetId).attr('src','./image/ribbon_attend.png');
else if(studentList[number].attendance==2)
  $(targetId).attr('src','./image/ribbon_late.png');
else
  $(targetId).attr('src','./image/ribbon_absent.png');



/*
var rgb=$(targetId).css('background-color');
var hex_rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
var color="#"+hex(hex_rgb[1]) + hex(hex_rgb[2]) + hex(hex_rgb[3]);

if(color=="#ff6666") //red
  $(targetId).css('background-color','#99ccff'); //blue
else if(color=="#99ccff") //blue
  $(targetId).css('background-color','#99ff66'); //green
else //green
  $(targetId).css('background-color','#ff6666'); //red
*/




//alert(studentList[number].attendance);

//$(targetId).css('background-color','blue');
}


 
function hex(x){
return ("0" + parseInt(x).toString(16)).slice(-2);
}
 
function StudentInfo(){
var image;
var name;
var number;
var attendanceState;
var id;
var attendance;
}



function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function attend(res){
var i=0;
for(i=0;i<studentList.length;i++)
{
if(studentList[i].name==res.id)
{

if(studentList[i].attendance==1)
  ;
else
  changeAttendanceState(studentList[i].number);
}//end of if right

}//end of for loop



}//end of attend

function send(){
var lectureNumber=sessionStorage.getItem('lectureNumber');

var query=new DTO();
query.MessageNum=135;
var myId = sessionStorage.getItem('id');
query.id='movie';
query.lectureNum=lectureNumber;


//query.attendInfoList = [];
query.attendInfoList=new Array();

for(var i=0;i<studentList.length;i++)
{
var tempAttendInfo = new AttendInfo();
tempAttendInfo.studentNum = studentList[i].studentNum;
tempAttendInfo.attendance = studentList[i].attendance;
query.attendInfoList.push(tempAttendInfo);
console.log(tempAttendInfo);
}//end of for loop

console.log("length:"+query.attendInfoList.length);
socket.emit('data', query);

location.href="../teaching/teaching.html";
}//end of send

function AttendInfo() {
      var StudentNum;
    var attendance;
    var attendanceInfoNum;
    var studentImg;
     
}
