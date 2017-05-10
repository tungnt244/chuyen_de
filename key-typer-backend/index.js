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
var hasWinner = false;

io.on('connection', function(socket){

    socket.on('disconnect', function(){
        if(socket.rooms.length >0){
            let roomId = socket.rooms[0]
            redisClient.hdel(roomId, socket.id)
            
        }
    })

    //register socket and it's progess
    socket.on('update socket progress', function(percent, roomId, username){
        //find the index of client socket have the same id in the list 
        redisClient.hexists(roomId, socket.id, function(err, value){
            if (err) throw err
            if (value) {
                let temp = percent.toString()+'?'+username
                redisClient.hset(roomId, socket.id, temp)
            }
        })
        redisClient.hgetall(roomId, function(err, obj){
            for (let key in obj){
                let percentUN = obj[key].split('?')
                obj[key] = {
                    percent: percentUN[0],
                    username: percentUN[1]
                }
            }
            socket.to(roomId).emit('receive clientlist', obj)
        })
        
    })

    socket.on('who the winner', function(roomId){
        console.log('in on wo')
        console.log('roomId', roomId)
        if(!hasWinner){
            console.log('hasWinner', hasWinner)
            io.sockets.to(roomId).emit('set winner', socket.id)
        }
    })

    //join a room with the id is roomID
    socket.on('join room', function(roomId, username){
        let temp = '0?'+username
        redisClient.hset(roomId, socket.id, temp)

        socket.join(roomId);
    })

    //start all the game
    socket.on('start game room', function(roomId){
        io.sockets.to(roomId).emit('start game');
        hasWinner = false
    })

    // //stop all the game
    socket.on('stop game room', function(roomId){
        console.log('in stop game room')
        io.sockets.to(roomId).emit('stop game');
        hasWinner = true
    })
    
});

http.listen(8000, function(){
    console.log('listen to 8000')
})