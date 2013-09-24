var res;
var xm=0;
var ym=0;

function setting(){

var workSheetInfo=sessionStorage.getItem('workSheetInfo');
res=JSON.parse(workSheetInfo);
console.log(res);

var text="http://lattetime.cafe24.com:8888/";
text+=res.workSheetInfo.routes[0].route;
$('#ppt_screen').attr('src',text);


for(var i=0;i<res.workSheetInfo.answerArr.length;i++)
{
var height=res.workSheetInfo.answerArr[i].height;
var width=res.workSheetInfo.answerArr[i].width;
var x=res.workSheetInfo.answerArr[i].startX;
var y=res.workSheetInfo.answerArr[i].startY;


var temp='<input type="text" id="draggable'+i+'"onClick="javascript:sendProgress();"></input>';

$("#background").append(temp);
$( "#draggable"+i).css(
{'top': parseInt(y)-ym, 
'left' : parseInt(x)-xm, 
'position' : 'absolute', 
'height' :parseInt(height),
'width' :parseInt(width)
}
);


}//end of for loop



}//end of setting

function sendProgress(){
//alert("aaa");
var noneAnswerCounter=0;
for(var i=0;i<res.workSheetInfo.answerArr.length;i++)
{
var temp='#draggable'+i;
var answer=$(temp).val();

if(answer!="")
  noneAnswerCounter++;

}

var percent=noneAnswerCounter/res.workSheetInfo.answerArr.length;
console.log(percent);


var query=new DTO();
query.MessageNum=215;
var myId = sessionStorage.getItem('studentId');
query.id=myId;
query.progressInfo=percent;
socket.emit('data', query);


}//end of sendProgress

function send(){

var query=new DTO();
query.MessageNum=217;
var myId = sessionStorage.getItem('studentId');
query.id=myId;
query.activityNum=parseInt(res.activityNum,10);

var worksheetAnswer = new WorkSheetAnswerInfo();
var answerArr = [];

for(var i=0;i<res.workSheetInfo.answerArr.length;i++)
{
var temp='#draggable'+i;
var answer=$(temp).val();
console.log(answer);
var tempAnswer = new WorkSheetAnswerList();
tempAnswer.startX = res.workSheetInfo.answerArr[i].startX;
tempAnswer.startY = res.workSheetInfo.answerArr[i].startY;
tempAnswer.width = res.workSheetInfo.answerArr[i].width;
tempAnswer.height = res.workSheetInfo.answerArr[i].height;
tempAnswer.answer = answer;
tempAnswer.pageNum = res.workSheetInfo.answerArr[i].pageNum;
answerArr[i] = tempAnswer;
}//end of loop
worksheetAnswer.answerArr = answerArr;				   
query.workSheetAnswer = worksheetAnswer;

socket.emit('data', query);

}//end of send

function WorkSheetAnswerInfo(){
			 var answerArr;
}


function WorkSheetAnswerList(){
            var startX ;
				     var startY;
				     var width ;
				     var height ;
				     var answer ;
				     var pageNum ;
}
