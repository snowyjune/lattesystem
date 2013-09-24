function login(){
	var query=new DTO();
	
	query.MessageNum=301;
	console.log("socket"+socket);
	query.id=document.getElementById("id").value;
	id=query.id;
	query.password=document.getElementById("password").value;
	socket.emit('data', query);

}//end of login

/*
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
*/
function resizeContent() {
	var size_h = document.documentElement.clientHeight;
	var size_w = document.documentElement.clientWidth;
	size = size_h;
	if (size > 600) {
        	document.getElementById("login_side").style.height = size + "px";
		document.getElementById("content_bg").style.height = size + "px";
	} else if (size_h <= 600) {
        	document.getElementById("login_side").style.height = "800px";
		document.getElementById("content_bg").style.height = "800px";
	}
 }
/*
	var input = document.getElementById("t_id");
	input.size= Math.floor(0.02*size2 - 3);
	var input = document.getElementById("t_pass");
	input.size= Math.floor(0.02*size2 - 3);
//*/
