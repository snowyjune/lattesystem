
var firstChoice=null;
var secondChoice=null;
var step=0;
var flipCount=0;
var tempArrayForCard=[];
var answerList=[];

function setting(){

var wordInfo=sessionStorage.getItem('wordInfo');
res=JSON.parse(wordInfo);

var wordList;//=["apple","ramen","hahaha","hehehe","hohoho","hahaha","hehehe","hohoho","hahaha","hehehe","hohoho","hahaha","hehehe","hohoho"];
wordList=res.wordList;

var total='';
for(var i=0;i<wordList.length;i++){
	var text='<div class="flip" data-number='+i+' id='+i+'><div class="card flipped"><div class="face front">'+wordList[i]+'</div><div class="face back">Back</div></div></div>';
//	total+=text;
   $('#cardGamePannel').append($(text));
 //  console.log($('#card'+i));
}

//makeUnable();
var query=new DTO();
query.MessageNum=CLIENT_REQUEST_CONNECTION_STU;
var myId = sessionStorage.getItem('id');
query.id=myId;

socket.emit('data', query);
makeUnable();
}//end of setting

$(".flip").live("click", function(){
	if(flipCount<=0){
		return 0;
	}



	 var number=$(this).context.id;



	 if(step==0){
	 	firstChoice=number;
	 	step++;
	 	flipCount--;
	 	tempArrayForCard.push(number);
	 }else{
	 	secondChoice=number;
	 	step=0;
	 	flipCount--;
	 	makeUnable();
	 	tempArrayForCard.push(number);
	 }

	 $(this).find('.card').removeClass('flipped');

	var query={};
	query.MessageNum=CLIENT_REQUEST_CARDFLIP;
	var myId = sessionStorage.getItem('studentId');
	query.id=myId;
	query.cardNum=parseInt(number);
	socket.emit('data', query);
	console.log(query);

    return false;
});

function flipCard(res){

	if(flipCount>0){
		return 0;
	}


	var number=parseInt(res.cardNum);




	$('#'+number).find('.card').removeClass('flipped');
	tempArrayForCard.push(number);

}




//console.log(document.getElementById('cardGamePannel').innerHTML=total);


function makeUnable(){
	$('#cardGamePannel').addClass('unable');
	step=0;
	flipCount=0;
}

function removeUnable(){
	$('#cardGamePannel').removeClass('unable');	
	flipCount=2;
}


function applyResult(res){

	if(res.flipSuccess==1){
//		answerList.push(firstChoice);
//		answerList.push(secondChoice);

		firstChoice=null;
		secondChoice=null;
		tempArrayForCard.pop();
		tempArrayForCard.pop();
		tempArrayForCard=[];

	}else{
    	setTimeout(reFlipCard,800);
	}//end of else

}//end of applyResult

function reFlipCard(){
	console.log("first : "+firstChoice);
	console.log("second : "+secondChoice);

/*
	if(flipCount>0){
		$('#'+firstChoice).find('.card').addClass('flipped');
		$('#'+secondChoice).find('.card').addClass('flipped');
		firstChoice=null;
		secondChoice=null;
	}
*/
	for(var i=0;i<tempArrayForCard.length;i++){
		$('#'+tempArrayForCard[i]).find('.card').addClass('flipped');		
	}
	tempArrayForCard.pop();
	tempArrayForCard.pop();
	tempArrayForCard=[];
}