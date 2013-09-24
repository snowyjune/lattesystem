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

        if(res.MessageNum==302){
            if(res.is_success==1)
            {
            alert("�ݰ����ϴ� "+res.id+"�����!");
            sessionStorage.setItem('id', res.id);
            sessionStorage.setItem('sort', 'teacher');
            startSharePPT(res);
            }
            else
            {
            alert("������ Ȯ���ϼ���");
            }
        }//end of if 102
        else if(res.MessageNum==402)
        {
        alert("���� ������� ���� ���� ���߾� ��ٷ�~");
        }
        else if(res.MessageNum==403)
        {
        alert("403 ����");
        showPPT(res);
        }
        else if(res.MessageNum==405)
        {
//        var tt=hahaha();
//        tt=JSON.parse(res.writingLayer);
//          alert("�����ض�!");
//        console.log(tt.wow);
          takeEvent(res);
        }

        
});//end of data on

  
}//end of connect




function close() {
    console.log("Closing...");
    socket.emit('close');
}

