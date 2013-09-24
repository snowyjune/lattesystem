var problemNumber=0;
var ctx;
var check=false;
var z=100;


//형이 구현한거  + 답칸 추가함.
function setting(){

$('#answer').append('<br>');
 $('#back').bind({
  mousedown: function(e){
  	if(check)
    {
    	problemNumber++;
    	z++;
    	var id=problemNumber;
    	$("#back").append('<div id="'+id+'" class="haha" style="width:30; height:30; position:absolute">'+id+'</div>');
    	$("#"+id).draggable();
    	$("#"+id).resizable();
    	$("#"+id).css('top',e.clientY-$('#back').offset().top);
    	$("#"+id).css('left',e.clientX-$('#back').offset().left+$(window).scrollleft);
    	
    	//답칸 추가부
    	$('#answer').append(id+'<input type="text" id="answer'+id+'"></input><br>')    
    	
    	check=false;
    }
  }//end of mousedown


});


/*
ctx.save();
    ctx.lineWidth = 30;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,100,100);
    ctx.strokeStyle = "red";
    ctx.strokeRect(0,0,100,100);        
    ctx.restore();
*/
}//end of setting


//영화형이 구현한 거 그대로니까 형한테 물어봐....
function add(){

check=true;
}//end of load

function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("myImage");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}


/*
 * wsInfo.route 추가해줘요~
 * 워크시트 업로드 경로....ㅠㅠㅠㅠ
 */
function saveWorksheet(){
	var i;
	
	//MessageNum, id 입력
	var dto = new DTO();
	dto.MessageNum = 319;
	dto.id = sessionStorage["id"];
	dto.activityNum = sessionStorage["activityNum"];
	//새로 제작한 것에 대한 WorkSheetInfo
	var wsInfo = new WorkSheetInfo();
	
	//워크시트 숫자는 1로 고정
	wsInfo.pageNum = 1;	
	
	//routes 생성 - 워크시트 숫자는 항상 1이다.
	wsInfo.routes = new Array(wsInfo.pageNum);
	wsInfo.routes[0] = new WorkSheetRoute();
	
	//답칸 Array 생성
	wsInfo.answerArr = new Array(problemNumber);
	for(i=0; i<problemNumber; i++){
		wsInfo.answerArr[i] = new AnswerSpace();
	}	
	
	//답에 대한 정보 입력
	for(i=1; i<=problemNumber; i++){
		wsInfo.answerArr[i-1].startX = $('#'+i).position().left;
		wsInfo.answerArr[i-1].startY = $('#'+i).position().top;
		wsInfo.answerArr[i-1].width = $('#'+i).width();
		wsInfo.answerArr[i-1].height = $('#'+i).height();
		wsInfo.answerArr[i-1].answer = document.getElementById('answer'+i).value;
		wsInfo.answerArr[i-1].pageNum = 1;

		console.log('id: '+i);
		console.log('startX: '+wsInfo.answerArr[i-1].startX);
		console.log('startY: '+wsInfo.answerArr[i-1].startY);
		console.log('width: '+wsInfo.answerArr[i-1].width);
		console.log('height: '+wsInfo.answerArr[i-1].height);
		console.log('answer: '+wsInfo.answerArr[i-1].answer+'\n');
	}
	
	//*
	//네트워크 연결되면 주석 해제할것
	dto.workSheetInfo = wsInfo;	
	socket.emit('data', dto);
	//*/
}

