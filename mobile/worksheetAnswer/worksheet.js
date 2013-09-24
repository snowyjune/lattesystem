
function setting(){

///////////////////
//about asking worksheet information//
var query=new DTO();
query.MessageNum=331;
query.id='lucybe';
query.activityNum=3;
socket.emit('data', query);
/////////////////////////////////////

}//end of setting

//when socket get 332 from server, this function works to display worksheet
function showWorksheet(res){

//console.log(res.workSheetInfo.routes[0].route);
//var text="http://lattetime.cafe24.com:8888/";
//text+=res.workSheetInfo.routes[0].route;
$('#ppt_screen').attr('src',res.workSheetInfo.routes[0].route);


///////////////////
//about asking worksheet information//
var query=new DTO();
query.MessageNum=335;
query.id='lucybe';
query.workSheetAnswerNum=11;
socket.emit('data', query);
/////////////////////////////////////


}//end of showWorksheet

function spreadAnswer(res){

for(var i=0;i<res.workSheetInfo.length;i++)
{
var height=res.workSheetInfo[i].height;
var width=res.workSheetInfo[i].width;
var x=res.workSheetInfo[i].startX;
var y=res.workSheetInfo[i].startY;


var temp='<input type="text" id="draggable'+i+'" value="'+res.workSheetInfo[i].answer+'"></input>';

$("#background").append(temp);
$( "#draggable"+i).css(
{'top': parseInt(y), 
'left' : parseInt(x), 
'position' : 'absolute', 
'height' :parseInt(height),
'width' :parseInt(width)
}
);
}//end of for loop to display white input box

}