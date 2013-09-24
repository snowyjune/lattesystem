var state=true;
function button(){
if(state==true)
{
$('#button').css('right',0);
$('#progressContainer').css('right',-200);
state=false;
}
else
{
$('#button').css('right',200);
$('#progressContainer').css('right',0);
state=true;
}

}//end of button

function addProgress(res){
var name="#"+res.id;
$(name).progressbar("value", res.progressInfo*100);
}

function spreadStudents(res){
var text='<div style="height:30;width:20;"></div>';
$('#con').append(text);

var i=0;
for(i=0;i<res.attendInfo.length;i++)
{
console.log(res.attendInfo[i].studentId);
var temp='<div><b>'+res.attendInfo[i].studentId+'</b><div id="'+res.attendInfo[i].studentId+'" style="height:20;width:100%;"></div>'+'</div>';

$('#con').append(temp);
$("#"+res.attendInfo[i].studentId).progressbar({
      value: 0
    });
}//end of for loop

console.log(res);

}//end of spreadStudents
 
function setting(){

var activityNumber=sessionStorage.getItem('activityNumber');
var query=new DTO();
query.MessageNum=CLIENT_REQUEST_WORKSHEETINFO_TEA;
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
query.activityNum=parseInt(activityNumber,10);

socket.emit('data', query);

//for(var i=0;i<500;i++)
//  $('#con').append('<div>a'+i+'</div>');

var height=$(document).height();
$('#progress').css('height',height);
button();
/*
var temp='<div '+'id="'+studentList[i].number+'" onClick="javascript:changeAttendanceState('+"'"+studentList[i].number+"'"+');"' +' style="margin-left:10; margin-top:10; background-color:#FF6666; height:160; width:140; display:inline-block;">'+
'<img src="'+studentList[i].image+'" style="height:100; margin-top:10; margin-bottom:0"></img>'+
'<p style="margin-top:3;">'+studentList[i].name+'<br>'+studentList[i].number+'</p>'+
'</div>';
$("#attendance_book").append(temp);
*/
//var temp='<div id="draggable" class="ui-widget-content">aaa</div>';
//$("#background").append(temp);
//$( "#draggable" ).draggable();
//$( "#draggable" ).css({'top': 10, 'left' : 300});
//    z-index:100;
//var temp='<div id="draggable" class="ui-widget-content">aaa</div>';
/*
var temp='<input type="text" id="draggable">aaa</input>';
$("#background").append(temp);
$( "#draggable" ).css(
{'top': 135, 
'left' : 0, 
'position' : 'absolute', 
'height' :33,
'width' :38
}
);

var temp='<input type="text" id="draggable2">aaa</input>';
$("#background").append(temp);
$( "#draggable2" ).css(
{'top': 135, 
'left' : 627, 
'position' : 'absolute', 
'height' :33,
'width' :38
}
);


var temp='<input type="text" id="draggable3">aaa</input>';
$("#background").append(temp);
$( "#draggable3" ).css(
{'top': 135, 
'left' : 667, 
'position' : 'absolute', 
'height' :33,
'width' :38
}
);
*/

}//end of setting


function showWorksheet(res){

//console.log(res.workSheetInfo.routes[0].route);
var text="http://lattetime.cafe24.com:8888/";
text+=res.workSheetInfo.routes[0].route;
$('#ppt_screen').attr('src',text);

var classNumber=sessionStorage.getItem('classNumber');
var query=new DTO();
query.MessageNum=CLIENT_REQUEST_ATTENDINFO_TEA;
//alert(id);
var myId = sessionStorage.getItem('teacherId');
query.id=myId;
query.subjectNum=classNumber;

socket.emit('data', query);


}//end of showWorksheet