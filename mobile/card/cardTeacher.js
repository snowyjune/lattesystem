var totalTime;//=1000;
var munite;//=parseInt(totalTime/60);
var second;

function setting(){
	var groupList=[1,2,3,4,5,6];
	var groupNumber=parseInt(sessionStorage.getItem('groupNumber'));


	for(var i=0;i<groupNumber;i++){
//		var text='<div class="group" id="group'+i+'">'+groupList[i]+'</div>';
		var text='<div class="group" id="group'+i+'"><div class="groupHeader">Group '+i+'</div><div id=number'+i+' class="leftProblem">10</div></div>';

	   $('#groupBoard').append($(text));
	}//end of for

	totalTime=parseInt(sessionStorage.getItem('gameTime'));
	munite=parseInt(totalTime/60);
	second=totalTime%60;
	document.getElementById('muniteShow').innerHTML=munite;
	document.getElementById('secondShow').innerHTML=second;

//	setTimeout(countTime,1000);


	var activityNumber=sessionStorage.getItem('activityNumber');
	var query={};
	query.MessageNum=CLIENT_REQUEST_STARTFIXACTIVITY_TEA;
	var myId = sessionStorage.getItem('teacherId');
	query.id=myId;
	query.activityNum=parseInt(activityNumber,10);
	query.activityType="CARDGAME";

	socket.emit('data', query);

	setTimeout(letServerKnowTime,5000);
	/*


var number=document.getElementById("groupUnit").value;

sessionStorage.setItem("gameTime",number);

var query=new DTO();
query.MessageNum=CLIENT_REQUEST_CARDTIMERSTART;
var myId = sessionStorage.getItem('id');
query.id=myId;
query.second=parseInt(number,10);
socket.emit('data', query);

*/

};

function countTime(){

	totalTime--;
	munite=parseInt(totalTime/60);
	second=totalTime%60;
	document.getElementById('muniteShow').innerHTML=munite;
	document.getElementById('secondShow').innerHTML=second;

	setTimeout(countTime,1000);

}


function letServerKnowTime(){
	var number=parseInt(sessionStorage.getItem('gameTime'));
	var query=new DTO();
	query.MessageNum=CLIENT_REQUEST_CARDTIMERSTART;
	var myId = sessionStorage.getItem('id');
	query.id=myId;
	query.second=parseInt(number,10);
	socket.emit('data', query);



}


function updateLeftProblems(res){
	var list=res.remainNumList;
	console.log("@@@");
	console.log(list);

	for(var i=0;i<list.length;i++){
		document.getElementById('number'+i).innerHTML=list[i];
	}
}



//console.log(document.getElementById('cardGamePannel').innerHTML=total);


