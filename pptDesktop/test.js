// Bind canvas to listeners
var canvas = document.getElementById('canvas');
//canvas.addEventListener('mousedown', mouseDown, false);
//canvas.addEventListener('mousemove', mouseMove, false);
//canvas.addEventListener('mouseup', mouseUp, false);
var ctx = canvas.getContext('2d');

ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
var isDown=false;


function mouseDown(e) {
var offset=$("#canvas").offset();
//ctx.fillRect(e.pageX-offset.left,e.pageY-offset.top,50,50);
isDown=true;
ctx.beginPath();
ctx.moveTo(e.x-offset.left,e.y-offset.top);
};

function mouseMove(e) { 
var offset=$("#canvas").offset();

if(isDown!=false)
{
ctx.lineTo(e.x-offset.left,e.y-offset.top);
//ctx.strokeStyle = curColor;
ctx.stroke();
}//end of if isDown is not false


};//end of mouseMove

function mouseUp(e) { 
isDown=false;
ctx.closePath();
};//end of mouseUp

// clear both canvases!
function clear() {


    ctx.clearRect(0, 0, 959, 1000);

};
