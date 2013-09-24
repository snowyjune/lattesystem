var res;
var coloredClass=null;
var pptList=new Array();
var pptState=false;
var worksheetState=false;
var worksheetList=new Array();

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
setVerticalMiddle("#title_table","#title_cell","#title");
setVerticalMiddle("#title_table_left","#title_cell_left","#title_left");

var teacherId = sessionStorage.getItem('teacherId');

$('#title_cell').html('<b>Hello, '+teacherId+'</b>');

/*
 var query=new DTO();
 
 query.MessageNum=101;
 query.id=document.getElementById("student_id").value;
 query.password=document.getElementById("student_pw").value;

//  toast(query.ID);
// say(query);
// connection.send(JSON.stringify(query));
  socket.emit('data', query);
  */

var query=new DTO();
query.MessageNum=CLIENT_REQUEST_SUBJECTLIST_TEA;
//alert(id);
var myId = sessionStorage.getItem('id');
query.id=myId;

socket.emit('data', query);




}//end of setting

function showPPT(res){
close();
sessionStorage.setItem('pptInfo', JSON.stringify(res));
location.href="../ppt/ppt2.html";
}//end of showPPT


function showWorksheet(res){
close();
sessionStorage.setItem('worksheetInfo', JSON.stringify(res));
location.href="../worksheet/worksheet2.html";
}//end of showPPT


function spreadClasses(res){

$('#classes_list').empty();
var i=0;
console.log(res.subjectList);
var subjectList=res.subjectList;

for(i=0;i<res.subjectList.length;i++)
{

$("#classes_list").append('<div id='+'"'+subjectList[i].subjectNum+'"'+' onClick="javascript:spreadLectuers('+subjectList[i].subjectNum+');">'+subjectList[i].ClassName+" "+subjectList[i].subjectName+'</div>');

}//end of for loop


}//end of spreadClasses 

function changeColor(id)
{

if(coloredClass!=null)
  $(coloredClass).css({'color':'white','font-size':'100%'});

var tempId="#"+id;
$(tempId).css({'color':'336699','font-size':'100%'});
coloredClass=tempId;

}//end of changeColor

function spreadLectuers(class_name){
var classId=class_name+"";
//changeColor(classId);
$('#lectures_list').empty();

sessionStorage.setItem('classNumber', class_name);

 
var query=new DTO();
query.MessageNum=CLIENT_REQUEST_LECTURELIST_TEA;
query.subjectNum=class_name;
var myId = sessionStorage.getItem('id');
query.id=myId;

socket.emit('data', query);



////나중에 지워라
$('#lectures_list li').bind('click', function () {
  location.href="../teaching/teaching.html";
});
/////////////// 


//$('#lectures_list').listview('refresh'); 


}//end of spreadLectures


function showLectures(res){
console.log("aaa");
console.log(res);
if(res.lectureList==undefined)
{
$("#lectures_list").append('<div class="lecture">준비된 강의가 없습니다</div>');
}
else
{
for(i=0;i<res.lectureList.length;i++)
{
$("#lectures_list").append('<div data-icon="false" class="lecture" onClick="javascript:haha('+res.lectureList[i].lecNum+');">'+res.lectureList[i].lecName+'</div>');
}
//$("#lectures_list").append('<li data-icon="false"><a href="#"><b>집합 1</b></a></li>');
//$("#lectures_list").append('<li data-icon="false"><a href="#"><b>집합 2</b></a></li>');
}//end of else
}//end of showLectures



function haha(lecNum){
  sessionStorage.setItem('lectureNumber', lecNum);
  location.href="../teaching/teaching.html";
}


function a(){
var query=new DTO();
query.MessageNum=111;
//alert(id);
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
socket.emit('data', query);
}

function sorting(res){
var i=0;
var pptCount=0;
var worksheetCount=0;

for(i=0;i<res.activityList.length;i++)
{
if(res.activityList[i].actType=="PPT")
{
pptList[pptCount]=res.activityList[i];
pptCount++;
}//end of if ppt
else 
{
worksheetList[worksheetCount]=res.activityList[i];
worksheetCount++;
console.log("a");
}

addSort();
//add();
}//end of for loop


}//end of sorting

function addSort(){

$('#lectures_list').empty();
$("#lectures_list").append('<div id="pptSort" onClick="javascript:spreadPPT();"></div>');
$("#lectures_list").append('<div id="worksheetSort" onClick="javascript:spreadWorksheet();"></div>');
}


function triggerWorksheet(actNum){
var query=new DTO();
query.MessageNum=121;
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
query.activityNum=actNum;
socket.emit('data', query);
}

function triggerPPT(actNum){
var query=new DTO();
query.MessageNum=119;
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
query.activityNum=actNum;
socket.emit('data', query);
}



function spreadPPT(){

if(pptState==false)
{
$('#lectures_list').empty();
$("#lectures_list").append('<div id="pptSort" onClick="javascript:spreadPPT();"></div>');
var i=0;


for(i=0;i<pptList.length;i++)
{
$("#lectures_list").append('<div class="lecture" onClick="javascript:triggerPPT('+pptList[i].actNum+')">'+pptList[i].actName+'</div>');

}
$("#lectures_list").append('<div id="worksheetSort" onClick="javascript:spreadWorksheet();"></div>');
pptState=true;
worksheetState=false;
}
else
{
addSort();
pptState=false;
}//end of else

}//end of spreadPPT

function spreadWorksheet(){

if(worksheetState==false)
{
$('#lectures_list').empty();
$("#lectures_list").append('<div id="pptSort" onClick="javascript:spreadPPT();"></div>');
$("#lectures_list").append('<div id="worksheetSort" onClick="javascript:spreadWorksheet();"></div>');

var i=0;
for(i=0;i<worksheetList.length;i++)
{
$("#lectures_list").append('<div class="lecture" onClick="javascript:triggerWorksheet('+worksheetList[i].actNum+')">'+worksheetList[i].actName+'</div>');
}

worksheetState=true;
pptState=false;
}//end of if
else
{
addSort();
worksheetState=false;
}//end of else

}//end of spreadWorksheet

function add(){
$('#lectures_list').empty();

var i=0;


for(i=0;i<pptList.length;i++)
{
$("#lectures_list").append('<div class="lecture">'+pptList[i].actName+'</div>');

}

for(i=0;i<worksheetList.length;i++)
{
$("#lectures_list").append('<div class="lecture">'+worksheetList[i].actName+'</div>');
}

}//end of add