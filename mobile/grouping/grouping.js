var studentList;
var list;

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

var query=new DTO();
query.MessageNum=137;
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
socket.emit('data', query);



var groupingInfo=sessionStorage.getItem('groupingInfo');
var res=JSON.parse(groupingInfo);

console.log("===============");
console.log(res);
//var unitNumber=parseInt(sessionStorage.getItem("groupUnit"),10);
spreadGroups(res);
}//end of setting

function spreadGroups(res){
var unitNumber=parseInt(sessionStorage.getItem("groupUnit"),10);
var i=0;
var j=0;

list=new Array();
for(i=0;i<res.groupList.length;i++)
{

  list[i]=new Array();
  for(j=0;j<unitNumber;j++)
  {
    list[i][j]='none';
  }
}

sessionStorage.setItem("groupNumber",res.groupList.length);

for(i=0;i<res.groupList.length;i++)
{
var temp='<div '+'id="'+res.groupList[i]+'" onClick="javascript:change('+"'"+res.groupList[i]+"'"+');"' +'style="margin-left:10; margin-top:10; background-color:white; width:271; display:inline-block;">';
temp+='<div class="groupTitle"><b>'+res.groupList[i]+' ±×·ì</b></div>';
for(j=0;j<unitNumber;j++)
{
var name=res.groupList[i]+""+j;
temp+='<div id="'+name+'" class="groupUnit">none</div>';
}//end of j loop

temp+='</div>';
$("#attendance_book").append(temp);
}//end of loop

}

function change(a){
;
}

function addStudent(res){

var number=parseInt(res.groupId,10);
var unitNumber=parseInt(sessionStorage.getItem("groupUnit"),10);

for(var i=0;i<unitNumber;i++)
{
 
  if(list[number][i]=='none')
  {
  var name="#"+number+""+i;
  $(name).html(""+res.studentId);
  list[number][i]=res.studentId;
  break;
  }

}

}//end of adStudent

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




function finishGrouping(){

var query=new DTO();
query.MessageNum=CLIENT_REQUEST_GROUPINGCOMPLETE_TEA;
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
socket.emit('data', query);

location.href="../teaching/teaching.html";
}