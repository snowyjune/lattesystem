function setVerticalMiddle(table,cell,target){

$(table).css("display","table");
$(table).css("height","100%");
$(table).css("width","100%");
$(table).css("overflow","hidden");
$(table).css("text-align","center");

$(cell).css("top","50%");
$(cell).css("display","table-cell");
$(cell).css("vertical-align","middle");

$(target).css("position","relative");
$(target).css("top", "-50%");

 
}

function setting(){
 
var activityList=new Array();
var tempActivity=new Activity();
tempActivity.image="./attendance.jpg";
tempActivity.name="√‚ºÆ";
tempActivity.sort="attendance";
tempActivity.number=0;
activityList[0]=tempActivity;

var tempActivity=new Activity();
tempActivity.image="./attendance.jpg";
tempActivity.name="PPT";
tempActivity.sort="ppt";
tempActivity.number=0;
activityList[1]=tempActivity;

var i=0;
for(i=0;i<activityList.length;i++)
{

var sentance=
'<div id="activity" style="display: inline-block; z-index:150">'+
'<image src="'+activityList[i].image+'" style="width:40; height=40;"></img>'
+activityList[i].sort+'</div>';

$("#teaching_contents").append(sentance);


var query=new DTO();
query.MessageNum=CLIENT_REQUEST_CONNECTION_STU;
var myId = sessionStorage.getItem('id');
query.id=myId;

socket.emit('data', query);



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
//          alert(ui.draggable.text());
            if(ui.draggable.text()=="attendance")
              location.href="../attendance/attendance.html";
            else if(ui.draggable.text()=="ppt")
              location.href="../ppt/ppt.html";

        }

      }
    });
    
    
    
    
    
 
 

}//end of setting

 
 
function Activity(){
var image;
var name;
var sort;
var number;

}