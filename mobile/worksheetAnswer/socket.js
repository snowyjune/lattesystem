var socket;
var checkConnection=false;
var id;




function connect() {
//  connection = new WebSocket("http://lattetime.cafe24.com:9999");
//http://lattetime.cafe24.com:9999/teacher
  // Log errors
 socket = io.connect('http://lattetime.cafe24.com:8888');


 socket.on('data', function (res) {
        
        console.log(res);

        if(res.MessageNum==332){
        showWorksheet(res);
        }//end of if 102
        if(res.MessageNum==336){
        spreadAnswer(res)
        }//end of if 102
        

        
});//end of data on

  
}//end of connect




function close() {
    console.log("Closing...");
    socket.emit('close');
}