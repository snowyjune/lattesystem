function login(sort){
 
//location.href="../subject/subject.html";
//나중에 지워라
 
if(false)
{
  toast("접속을 확인 하세요");
}
else
{
 var query=new DTO();

 if(sort=='teacher') 
  query.MessageNum=CLIENT_REQUEST_LOGIN_TEA;
 else
  query.MessageNum=CLIENT_REQUEST_LOGIN_STU;
  
 query.id=document.getElementById("student_id").value;
 id=query.id;
 query.password=document.getElementById("student_pw").value;

//  toast(query.ID);
// say(query);
// connection.send(JSON.stringify(query));
  socket.emit('data', query);
}

}//end of login

var toast=function(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}