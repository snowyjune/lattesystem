function setting(){

}

function sendGroupUnit(){

var number=document.getElementById("groupUnit").value;

sessionStorage.setItem("groupUnit",number);

var query=new DTO();
query.MessageNum=CLIENT_REQUEST_GROUPDECISION_TEA;
var myId = sessionStorage.getItem('id');
query.id=myId;
query.number=parseInt(number,10);
query.subjectNum=parseInt(sessionStorage.getItem('classNumber'),10);

socket.emit('data', query);

}