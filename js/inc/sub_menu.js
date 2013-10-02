document.write('<div class="menu" id="sub-menu">');
document.write('<div id="sub_menu_content">');

if(sessionStorage["selMenu"] == "ppt") {
	document.write('<img src="../img/ppt_list.png" />');
	var subjectList = JSON.parse(sessionStorage["subjectList"]);
	for(i = 0; i < subjectList.length; i++) {
		document.write('<div onclick="getPptInfo('+subjectList[i].activityNum+');">'+ subjectList[i].activityName +'</div><br/>');
	}
	
}
else if (sessionStorage["selMenu"] == "worksheet") {
	document.write('<img src="../img/worksheet_list.png" />');
	var subjectList = JSON.parse(sessionStorage["subjectList"]);
	for(i = 0; i < subjectList.length; i++) {
		document.write('<div onclick="getWorksheetInfo('+subjectList[i].activityNum+');">'+ subjectList[i].activityName +'</div><br/>');
	}
	
}
else if (sessionStorage["selMenu"] == "subject") {
	document.write('<img src="../img/Classlist_txt.png" />');
	var subjectList = JSON.parse(sessionStorage["subjectList"]);
	for(i = 0; i < subjectList.length; i++) {
		document.write('<div onclick="getLectureList('+subjectList[i].subjectNum+');">'+ subjectList[i].subjectName + '/'+subjectList[i].className +'</div><br/>');
	}
	
}

else if (sessionStorage["selMenu"] == "submit") {
	document.write('<img src="../img/Classlist_txt.png" />');
	var subjectList = JSON.parse(sessionStorage["subjectList"]);
	for(i = 0; i < subjectList.length; i++) {
		document.write('<div onclick="getSubmitActivityList('+subjectList[i].subjectNum+');">'+ subjectList[i].subjectName + '/'+subjectList[i].className +'</div><br/>');
	}
	
}
else if(sessionStorage["selMenu"] == "card"){

	document.write('<img src="../img/ppt_list.png" />');
	var subjectList = JSON.parse(sessionStorage["subjectList"]);



	console.log(subjectList);
	for(i = 0; i < subjectList.length; i++) {
		document.write('<div onclick="getPptInfo('+subjectList[i].activityNum+');">'+ subjectList[i].activityName +'</div><br/>');
	}
}
document.write('</div>');
document.write('</div>');