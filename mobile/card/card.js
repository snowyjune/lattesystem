
var firstChoice=null;
var secondChoice=null;

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
}//end of setting

$(".flip").live("click", function(){

	 var number=$(this).context.id;

	 if(firstChoice==null){
	 	firstChoce=number;
	 }else{
	 	secondChoice=number;
	 }
	 $(this).find('.card').removeClass('flipped');


	var query={};
	query.MessageNum=CLIENT_REQUEST_CARDFLIP;
	var myId = sessionStorage.getItem('studentId');
	query.id=myId;
	query.cardNum=parseInt(number);
	socket.emit('data', query);
	console.log(query);

//	 $(this).find('.card').addClass('flipped');
//	 console.log($(this));
//	 var number=$(this).data('data-number');

//	 console.log(number);
//firstChoice=
//	 $(this).find('.card').addClass('flipped').mouseleave(function(){
  //          $(this).removeClass('flipped');
    //    });
        return false;
});




//console.log(document.getElementById('cardGamePannel').innerHTML=total);


function makeUnable(){
	$('#cardGamePannel').addClass('unable');
}