var currentPage=0;
var totalPage;
var PPTPalletState="close";
var slides;
var penModeCheck=false;
var size=0;

function clickPPTPallet(){
 
  if(PPTPalletState=="close")
  {
  $("#ppt_pallet").animate({"right":"-20"},"slow");
  PPTPalletState="open";
  }
  else
  {
  $("#ppt_pallet").animate({"right":"-127"},"slow");
  PPTPalletState="close";
  }


}
 
function setting(){

/*
var pptNumber=sessionStorage.getItem('activityNumber');
//alert(pptNumber);
    
var lecNum=sessionStorage.getItem('lectureNumber');
var query=new DTO();
query.MessageNum=119;
var myId = sessionStorage.getItem('id');
query.id=myId;
query.activityNum=parseInt(pptNumber,10);
socket.emit('data', query);
*/

var pptInfo=sessionStorage.getItem('pptInfo');
var res=JSON.parse(pptInfo);

var canvasHeight;
var canvasWidth;
canvasHeight=$(document).height();
canvasWidth=$(document).width();
$("#canvas").attr("height", screen.height);
$("#canvas").attr("width", canvasWidth);
size=canvasWidth;

 
 $('#background').bind({
  swipeleft: function(){
//  next();
  },
  swiperight: function(){
//  before();
  },
  click: function(e) {
    // do something on click
    var width=$(document).width(); 

    if(e.clientX>(width/2))
      next();
    else
      before();

  },
  mouseenter: function() {
    // do something on mouseenter
  }
});


showPPT(res);

}//end of setting


function next(){
if(currentPage<=totalPage)
{

slides[currentPage].slideCTX.drawImage(canvas,0,0);
//window.open(canvas.toDataURL("image/png"));

//slides[currentPage].slideCTX.fillRect(50,50,10,10);
clear();

currentPage++;
if(currentPage>=totalPage)
  currentPage=totalPage-1;

var text="http://lattetime.cafe24.com:8888/";
text+=slides[currentPage].image;
$("#ppt_screen").attr("src", text);

ctx.drawImage(slides[currentPage].currentCanvas,0,0);
}

var event=new eventObject();
event.x=0;
event.y=0;
event.type="next";
event.size=size;
sendChange(event);
}//end of next

function before(){

if(penModeCheck==false)
{

slides[currentPage].slideCTX.drawImage(canvas,0,0);
//window.open(canvas.toDataURL("image/png"));

//slides[currentPage].slideCTX.fillRect(50,50,10,10);
clear();

currentPage--;

if(currentPage<0)
  currentPage=0;

var text="http://lattetime.cafe24.com:8888/";
text+=slides[currentPage].image;
$("#ppt_screen").attr("src", text);
ctx.drawImage(slides[currentPage].currentCanvas,0,0);

var event=new eventObject();
event.x=0;
event.y=0;
event.type="before";
event.size=size;
sendChange(event);
}


}//end of before

function nathan(){
    event.preventDefault();
}

function ppt_scene(){
var image;
var currentCanvas;
var slideCTX;
}//end of ppt_scene

function penMode(){
if(penModeCheck==false)
{
$("#ppt_pen").css("background-color","#9999FF");
canvas.addEventListener('touchstart', mouseDown, false);
canvas.addEventListener('touchmove', mouseMove, false);
canvas.addEventListener('touchend', mouseUp, false);
$("#background").unbind('click');


penModeCheck=true;

document.body.addEventListener('touchmove', nathan, false); 
// end body.onTouchMove


}
else
{
$("#ppt_pen").css("background-color","");

//$("#canvas").unbind('mousedown');
//$("#canvas").unbind('mousemove');
//$("#canvas").unbind('mouseup');

canvas.removeEventListener('touchstart', mouseDown);
canvas.removeEventListener('touchmove', mouseMove);
canvas.removeEventListener('touchend', mouseUp);

 $('#background').bind({
  swipeleft: function(){
  },
  swiperight: function(){
  },
  click: function(e) {
    // do something on click
    var width=$(document).width(); 

    if(e.clientX>(width/2))
      next();
    else
      before();

  },
  mouseenter: function() {
    // do something on mouseenter
  }
});

penModeCheck=false;
document.body.removeEventListener('touchmove', nathan ,false);

}


}//end of penMode

function showPPT(res){

console.log(res);

slides=new Array();
totalPage=res.pptInfo.pageNum;
for(var i=0;i<res.pptInfo.pageNum;i++)
{
slides[i]=new ppt_scene();
slides[i].image=res.pptInfo.routes[i].route;
console.log(slides[i].image);
slides[i].pageNum=res.pptInfo.routes[i].pageNum;
slides[i].currentCanvas = document.createElement('canvas');
var canvasHeight;
var canvasWidth;
canvasHeight=$(document).height();
canvasWidth=$(document).width();
slides[i].currentCanvas.width = canvasWidth;
slides[i].currentCanvas.height = screen.height;

slides[i].slideCTX=slides[i].currentCanvas.getContext('2d');
}  


    
var text="http://lattetime.cafe24.com:8888/";
text+=slides[currentPage].image;
$("#ppt_screen").attr("src", text);

ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';


}//end of showPPT

function shareMode(){

var activityNumber=sessionStorage.getItem('activityNumber');
var query=new DTO();
query.MessageNum=139;
var myId = sessionStorage.getItem('id');
query.id=myId;
query.activityNum=parseInt(activityNumber,10);
socket.emit('data', query);

}//end of shareMode

function sendChange(event)
{
var query=new DTO();
query.MessageNum=141;
var myId = sessionStorage.getItem('id');
query.id=myId;
query.currentPPT=currentPage;

event.size=size;
query.writingLayer=JSON.stringify(event,["x","y","type","size"]);
socket.emit('data', query);
}//end of sendChange

function eventObject(){
var x;
var y;
var type;
var size;
}
