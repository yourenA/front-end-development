var express  = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/*io.on('connection', function (client) { //client当前连接的用户
 console.log('有一个用户连接', client.id);
 console.log('连接地址',client.request.headers.referer)
 client.on('chat message', function (msg) {
 console.log('get message', msg)
 client.emit('chat message', msg);
 });

 client.on('disconnect', function () {
 console.log('有一个用户离开')
 });
 io.sockets.emit("msg",{data:"hello,all"});//给所有客户端广播消息
 });*/

//可以在connection 以外使用emit
//io.sockets.emit('String',data);//给所有客户端广播消息
//io.sockets.socket(socketid).emit('String', data);//给指定的客户端发送消息

/*io.on('connection', function (socket) {
 socket.on('ferret', function (name, cb) {
 console.log(name); // name 将会是 'tobi'
 // 这里的回调 cb() 在服务器接收到消息后可以调用，以通知客户端服务器已接收消息；
 // 调用时还可以返回数据给客户端（这里是 'woot'）
 cb('woot');
 });
 socket.broadcast.emit('ferret',123);
 });*/

// io.on('connection', function (socket) {
//   var tweets = setInterval(function () {
//       socket.volatile.emit('bieber tweet', 'tweet');
//   }, 100);
//
//   socket.on('disconnect', function () {
//     clearInterval(tweets);
//   });
// });
// 房间用户名单
var roomInfo = {};
io.on('connection', function (socket) {
    // 获取请求建立socket连接的url
    // 如: http://localhost:3000/room/room_1, roomID为room_1
    var url = socket.request.headers.referer;
    console.log('url',url)
    var splited = url.split('/');
    var roomID = splited[splited.length - 1];   // 获取房间ID
    console.log('roomID',roomID)
    var user = '';

    socket.on('join', function (userName) {
        user = userName;
        console.log('user',user)
        // 将用户昵称加入房间名单中
        if (!roomInfo[roomID]) {
            roomInfo[roomID] = [];
        }
        roomInfo[roomID].push(user);
        console.log('roomInfo',roomInfo)
        socket.join(roomID);    // 加入房间
        // 通知房间内人员
        io.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);
        console.log(user + '加入了' + roomID);
    });

    socket.on('leave', function () {
        socket.emit('disconnect');
    });


    socket.on('disconnect', function () {
        // 从房间名单中移除
        var index = roomInfo[roomID].indexOf(user);
        console.log('index',index)
        if (index !== -1) {
            roomInfo[roomID].splice(index, 1);
        }

        socket.leave(roomID);    // 退出房间
        io.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
        console.log(user + '退出了' + roomID);
    });

// 接收用户消息,发送相应的房间
    socket.on('message', function (msg) {
        // 验证如果用户不在房间内则不给发送
        if (roomInfo[roomID].indexOf(user) === -1) {
            return false;
        }
        io.to(roomID).emit('msg', user, msg);
    });
})

// room page
app.get('/room/:roomID', function (req, res) {
    res.sendFile(__dirname + '/public/room.html');
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
