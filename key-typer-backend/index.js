var redis = require('redis');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

redisClient = redis.createClient();

redisClient.on('error', function(err){
    console.log('Error' + err);
})


app.get('/', function(req,res){
    res.sendFile(__dirname+'/index.html');
});

//contain client in the room
var rooms = [];

// var clients = [];

// rooms = [client]

//send to the room clients and it's percent.


//io is the connection of the serversocket

// function findClientInRoom(room) {
//     let listOfClient = [];
//     clients.forEach(function(client) {
//         if(client.room == String(this)){
//             listOfClient.push(client)
//         }
//     }, room);
//     return listOfClient;
// }

// function findCurrentSocket(socketId){
//     let indexCurrentSocket = clients.findIndex(function (client){
//         return client.id==String(this)
//     },socketId);
//     return indexCurrentSocket;
// }

io.on('connection', function(socket){

    socket.on('disconnect', function(){
        if(socket.rooms.length >0){
            let roomId = socket.rooms[0]
            redisClient.hdel(roomId, socket.id)
            redisClient.hgetall(roomId, function(err, obj){
                console.log(obj)
            })
        }
    })

    //register socket and it's progess
    socket.on('update socket progress', function(percent, roomId){
        //find the index of client socket have the same id in the list 
        redisClient.hexists(roomId, socket.id, function(err, value){
            if (err) throw err
            if (value) {
                redisClient.hset(roomId, socket.id, percent)
            }
        })
        redisClient.hgetall(roomId, function(err, obj){
            socket.to(roomId).emit('receive clientlist', obj)
        })
        
    })

    //join a room with the id is roomID
    socket.on('join room', function(roomId){

        redisClient.hset(roomId, socket.id, 0)

        socket.join(roomId);
        
        redisClient.hgetall(roomId, function(err,obj){
            console.log(obj)
        })
    })

    //start all the game
    socket.on('start game room', function(roomId){
        io.sockets.to(roomId).emit('start game');
    })

    // //stop all the game
    socket.on('stop game room', function(roomId){
        io.sockets.to(roomId).emit('stop game');
    })
    
});

http.listen(8000, function(){
    console.log('listen to 8000')
})