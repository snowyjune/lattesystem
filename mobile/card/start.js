function setting(){

}

function sendGameTime(){
	var number=document.getElementById("groupUnit").value;
	sessionStorage.setItem("gameTime",number);
    location.href="../card/cardTeacher.html";                   
}