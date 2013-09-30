var teachingPalletState="close";

 function clickPallet(){
 
  if(teachingPalletState=="close")
  {
  $("#teaching_pallet").animate({"top":"0"},"slow");
  teachingPalletState="open";
  }
  else
  {
  $("#teaching_pallet").animate({"top":"-154"},"slow");
  teachingPalletState="close";
  }

}
 

function startAttendance()
{
location.href="../attendance/attendance.html";
 
}

function startGrouping()
{
location.href="../grouping/start.html";
 
}



function showMenus(){

var menuInfo=sessionStorage.getItem('menuInfo');
var res=JSON.parse(menuInfo);
$("#teaching_contents").append('<div style="height:40;width:100%;"></div>');

if(res==null)
  return 0;
  
var activityList=new Array(); 
var i=0;
console.log("-===============");
console.log(res.today_activity[0].actName);
console.log("-===============");

for(i=0;i<res.today_activity.length;i++)
{
var tempActivity=new Activity();
tempActivity.image=res.today_activity[i].actImg;
//tempActivity.image="../teaching/attendance.jpg";
tempActivity.name=res.today_activity[i].actName;
tempActivity.sort=res.today_activity[i].actType;
tempActivity.number=res.today_activity[i].actNum;
activityList[i]=tempActivity;
}//end of for loop 


var i=0;
for(i=0;i<activityList.length;i++)
{

var sentance=
'<div id='+'"'+activityList[i].number+'"'+' style="display: inline-block; z-index:150; text-align:center;" title='+'"'+activityList[i].sort+'"'+'>'+
'<image src="'+activityList[i].image+'" style="width:60; height=60;"></img><br>'
+activityList[i].name+'</div>';

$("#teaching_contents").append(sentance);



}//end of loop


$(function() {
  $( "#teaching_contents div" ).draggable();
});




$( "#background" ).droppable({
      drop: function( event, ui ) {
//        $( this )
  //        .addClass( "ui-state-highlight" )
    //      .find( "p" )
      //      .html( "Dropped!" );
//document.getElementById("field_item1_content").innerHTML="none"; 

//      alert(ui.draggable.text());
//      console.log(ui.draggable.position());
        if(ui.draggable.position().top<150)
          ;
        else
        {
            console.log(ui.draggable);
            console.log($(ui.draggable).attr("title"));
            console.log($(ui.draggable).attr("id"));
            
            
            var activityType=$(ui.draggable).attr("title");
            var activityNumber=$(ui.draggable).attr("id");
            if(activityType=="PPT")
            {
                sessionStorage.setItem('activityNumber',activityNumber);
                location.href="../ppt/ppt.html";
            }
            else if(activityType=="WORKSHEET")
            {
                sessionStorage.setItem('activityNumber',activityNumber);
                location.href="../worksheet/worksheet.html";              
            }else if(activityType=="CARDGAME"){
                sessionStorage.setItem('activityNumber',activityNumber);
                location.href="../card/start.html";              
            }
/*
            if(ui.draggable.text()=="Ãâ¼®")
              location.href="../attendance/attendance.html";
            else if(ui.draggable.text()=="PPT")
              location.href="../ppt/ppt.html";
*/

        }

      }
    });






        
}//end of showActivity


function Activity(){
var image;
var name;
var sort;
var number;

}

function startBack(){
location.href="../teaching/teaching.html";
}