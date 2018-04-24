# Socket.io

* server
```
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//可客户端有io.connect('http://localhost');或io()才能连接
io.on('connection', function(client){ //client当前连接的用户
  console.log('有一个用户连接',client.name)
  client.on('chat message', function(msg){
    console.log('get message',msg)
    io.emit('chat message', msg);
  });
  client.on('disconnect', function(){
    console.log('有一个用户离开')
  });
});
http.listen(port, function(){
  console.log('listening on *:' + port);
});

```

* client
```
<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  $(function () {
    var socket = io.connect('http://localhost');// io.connect()需要连接的地址.若服务端与客户端不在同一项目内，则需要添加上服务所在具体域名或者IP和端口
    socket.on('connect', function () {
      console.log('链接服务器socket成功')
    });
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());//客户端服务端发送数据
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){ //端户端接收到服务端的数据
      $('#messages').append($('<li>').text(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });
  });
</script>
```

## 使用命名空间
在```on('connection')```前添加```.of('/chat')```

* server
```
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });
```

* client
```
var chat = io.connect('http://localhost/chat')
```

## 发送不稳定消息（可能丢失的消息）volatile
```
socket.volatile.emit('bieber tweet', tweet);
```

## 发送并获取数据（回执）

* server
```
io.on('connection', function (socket) {
  socket.on('ferret', function (name, cb) { //data,cb
    console.log(name); // name 将会是 'tobi'
    // 这里的回调 cb() 在服务器接收到消息后可以调用，以通知客户端服务器已接收消息；
    // 调用时还可以返回数据给客户端（这里是 'woot'）
    cb('woot');
  });
});
```

* client 
```
<script>
  // 注意：这里的示例加入了译者自己的理解，如果觉得不通，可以查看官网示例
  var socket = io(); // TIP: io() 不带参数会开启自动发现
  socket.on('connect', function () { // TIP: 你也可以直接监听具体事件，而不用监听 `connect` 事件！
    socket.emit('ferret', 'tobi', function (data) {
      // 回调将在服务器端调用 cb() 后执行
      console.log(data); // data 将会是 'woot'
    });
  });
</script>
```

## 广播信息
要广播消息，只需要在 emit 和 send 方法前面加上 broadcast 标志即可。广播意味着将消息发送给除发送者以外的所有人。

```
io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');
});
```

## 分组
*  socket.join(roomID) 将当前的连接加入分组roomID
*  socket.leave(roomID) 分组roomID删除当前连接
*  io.to(roomID).emit('msg', user, msg); 向某个分组roomID成员发送消息 
```
io.on('connection', function (socket) {
    socket.join(roomID);    // 加入房间
    socket.leave(roomID);    // 退出房间
    io.to(roomID).emit('msg', user, msg);
})
```



