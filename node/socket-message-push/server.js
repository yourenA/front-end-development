const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
var FileStreamRotator = require('file-stream-rotator')
const apiRoute = require('./src/routes/api');

const port = 4001;

// io.set( 'origins', '*localhost:4000' );
io.origins('*:*');

const { addSocketId, getSocketId, deleteSocketId } = require('./src/utils');

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

global.users = []; // 记录下登录用户的tokenId, socketId
global.io = io;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/api', function(req, res) {
    res.send('.');
});

// 后端向 '/api' 路径post相应消息
app.post('/api', apiRoute);

io.on('connection', function(socket) {
    // console.log('a user connected');
    // socket.broadcast.emit('new_user', {});
    console.log('connection',socket.id)
    socket.on('disconnect', function() {
        console.log('user disconnected   ', socket.id);
        deleteSocketId(users, socket.id);
        if (process.env.NODE_ENV === 'development') {
            displayUserInfo();
        }
    });

    socket.on('user_login', function(info) {
        const { tokenId, userId, socketId } = info;
        addSocketId(users, { tokenId, socketId, userId });
        if (process.env.NODE_ENV === 'development') {
            displayUserInfo();
        }
    });
});

http.listen(port, function() {
    console.log(`listening on port:${port}`);
});

function displayUserInfo() {
    console.log('当前登录用户信息：');
    console.log(users);
}
