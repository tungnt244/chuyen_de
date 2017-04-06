var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
});
var clientList = [];
//io is the connection of the serversocket
io.on('connection', function(socket){//socket is the socket connection with a single specific client.
    //define socket id and find it in the clientList, if it not in the client list, then add it.
    let socketId = socket.id;
    //ad socket to clientList
    let tempSocket= {
        id:socketId,
        percent: 0
    }
    clientList.push(tempSocket)
    console.log('in the main')
    console.log(clientList)
    //register socket and it's progess
    socket.on('update socket progress', function(percent){
        //find the index of client socket have the same id as 
        console.log(clientList)
        let indexCurrentSocket = clientList.findIndex(function (socket){
            return socket.id==String(this)
        },socketId);
        let tempSocket = {
                id:socketId,
                percent:percent
        };
        //neu nhu co socket do ton tai, cap nhat
        if(indexCurrentSocket != -1){
            clientList[indexCurrentSocket] = tempSocket;
        }else{
            console.log('can not find the socket')
        }
    })

    socket.on('join room', function(room){
        socket.join(room)
        console.log(room)
    })
});

http.listen(8000, function(){
    console.log('listen to 8000')
})