document.write('<div class="menu" id="sub-sub-sub-menu">');
document.write('<div id="sub_sub_sub_menu_content">');

	document.write('<h3>학생목록</h3><br/>');
	var studentList = JSON.parse(sessionStorage["studentList"]);
	for(i = 0; i < studentList.length; i++) {
		document.write('<div onclick="getSubmitAnswerList('+studentList[i].workSheetAnswerNum+');">'+ studentList[i].studentId+'</div><br/>');
	}
document.write('</div>');
document.write('</div>');