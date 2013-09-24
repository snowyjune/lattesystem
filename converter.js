exports.convert = function(id,type,dirname,filename,actName, _server ){
    var exec = require('child_process').exec, child;
    //var server = _server;
    server = require("./server");
    var exec_command = 'java -Djava.awt.headless=true -Xmx1024m -jar converter.jar '+id+' '+type+' ' + dirname+' ['+filename+'] ['+actName+']';
    console.log(exec_command);
    
    child = exec(exec_command,
      function (error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if(error !== null){
          console.log('exec error: ' + error);
        }
        //return stdout;
        server.send_convert_result(id,stdout);
    });
}