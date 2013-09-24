//desktop
var currentPage=0;
var totalPage;
var PPTPalletState="close";
var slides;
var penModeCheck=false;

function clickPPTPallet(){
 
  if(PPTPalletState=="close")
  {
  $("#ppt_pallet").animate({"right":"0"},"slow");
  PPTPalletState="open";
  }
  else
  {
  $("#ppt_pallet").animate({"right":"-127"},"slow");
  PPTPalletState="close";
  }


}
 
function setting(){
/////////////about login///////////////
var query=new DTO();
query.MessageNum=301;
query.id=sessionStorage["id"];
query.password=sessionStorage["pw"];
socket.emit('data', query);
////////////////////////////////////////


var canvasHeight;
var canvasWidth;
canvasHeight=$(window).height();
canvasWidth=$(window).width();
$("#canvas").attr("height", canvasHeight);
$("#canvas").attr("width", canvasWidth);



 
 $('#background').bind({
  swipeleft: function(){
//  next();
  },
  swiperight: function(){
//  before();
  },
  click: function(e) {
    // do something on click
    var width=$(window).width(); 

    if(e.clientX>(width/2))
      next();
    else
      before();

  },
  mouseenter: function() {
    // do something on mouseenter
  }
});

ctx.font = "bold 16px sans-serif";
/*ctx.fillText("nothing is shared right now",canvasHeight/2 , canvasHeight/2);*/
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
$('#ppt_screen').attr('src',text);
ctx.drawImage(slides[currentPage].currentCanvas,0,0);

}

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
$('#ppt_screen').attr('src',text);
ctx.drawImage(slides[currentPage].currentCanvas,0,0);
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
$("#pen").css("background-color","#9999FF");
//canvas.addEventListener('touchstart', mouseDown, false);
//canvas.addEventListener('touchmove', mouseMove, false);
//canvas.addEventListener('touchend', mouseUp, false);
$("#background").unbind('click');


penModeCheck=true;

document.body.addEventListener('touchmove', nathan, false); 
// end body.onTouchMove


}
else
{
$("#pen").css("background-color","#99CCCC");

//$("#canvas").unbind('mousedown');
//$("#canvas").unbind('mousemove');
//$("#canvas").unbind('mouseup');

//canvas.removeEventListener('touchstart', mouseDown);
//canvas.removeEventListener('touchmove', mouseMove);
//canvas.removeEventListener('touchend', mouseUp);

 $('#background').bind({
  swipeleft: function(){
  },
  swiperight: function(){
  },
  click: function(e) {
    // do something on click
    var width=$(window).width(); 

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
canvasHeight=$(window).height();
canvasWidth=$(window).width();
slides[i].currentCanvas.width = canvasWidth;
slides[i].currentCanvas.height = canvasHeight;

slides[i].slideCTX=slides[i].currentCanvas.getContext('2d');
}  


    
var text="http://lattetime.cafe24.com:8888/";
text+=slides[currentPage].image;
$('#ppt_screen').attr('src',text);

ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';


}//end of showPPT

function shareMode(){

var activityNumber=sessionStorage.getItem('activityNumber');
var query=new DTO();
query.MessageNum=143;
var myId = sessionStorage.getItem('id');
query.id=myId;
query.activityNum=parseInt(activityNumber,10);
socket.emit('data', query);

}//end of shareMode

//////////////for desktop//////////////////////////////
function startSharePPT(res)
{

var query=new DTO();
query.MessageNum=401;
query.id='movie';
socket.emit('data', query);
}

function takeEvent(res)
{
     var event=eventObject();
     event=JSON.parse(res.writingLayer);
     var size=$(document).width();

      console.log(event);
      console.log("size : "+size);
      console.log("mobile: "+event.size);
     var percent=(size/event.size);
      var minus=size-event.size;

      minus=minus/2;
      event.x+=minus;
//      event.x*=percent;
     if(event.type=="next")
     {
      currentPage=res.currentPPT-1;
      next();
     }//end of type pageMove
     else if(event.type=="before")
     {
      currentPage=res.currentPPT+1;
      before();
     }
     else if(event.type=="mousedown")
     {
      currentPage=res.currentPPT;
      mouseDown(event);      
     }
     else if(event.type=="mouseup")
     {
      currentPage=res.currentPPT;
      mouseUp(event);           
     }
     else if(event.type=="mousemove")
     {
      currentPage=res.currentPPT;
      mouseMove(event);      
     }

}//end of takeEvent

function eventObject(){
var x;
var y;
var type;
}
