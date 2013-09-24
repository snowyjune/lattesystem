
function setting(){

var teacherName=sessionStorage.getItem('thisTimeTeacher');


var myId = sessionStorage.getItem('id');
var hello='<div>Welcome back, '+myId+'!</div>';
$("#hello").append(hello);


var text1='Will you attend<br>to<br><b>'+teacherName+"'s class?</b>"; 

$("#text1").append(text1);


}//end of setting


function confirm(){
var query=new DTO();
query.MessageNum=CLIENT_REQUEST_ATTEND_STU;
//alert(id);
var myId = sessionStorage.getItem('id');
query.id=myId;

socket.emit('data', query);
}//end of confirm

function cancel(){
alert("cancel");
}

