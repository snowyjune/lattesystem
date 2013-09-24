document.write('<div class="menu" id="sub-sub-menu">');
document.write('<div id="sub_sub_menu_content">');
	document.write('<h3>액티비티 목록</h3><br/>');
	var activityList = JSON.parse(sessionStorage["activityList"]);
	for(i = 0; i < activityList.length; i++) {
		document.write('<div onclick="getSubmitStudentList('+activityList[i].actNum+');">'+ activityList[i].actName +'</div><br/>');
	}
document.write('</div>');
document.write('</div>');