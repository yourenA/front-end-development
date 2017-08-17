/**
 * Created by Administrator on 2017/8/17.
 */
var http = require('http');
var qs = require('querystring');

var opt = {
    host:'127.0.0.1',
    port:'8888',
    method:'POST',
    path:'/',
    headers:{
        'content-type': "application/json"
        //'accept-encoding': 'gzip'
    }
};

var body = '';
var req = http.request(opt, function(res) { //发送请求

    console.log("Got response: " + res.statusCode);
    res.on('data',function(d){
        body += d;
    });
    res.on('end', function(){
        console.log(res.headers);
        console.log(body)
    });
});

req.on('error', function(e) {
    console.log("Got error: " + e.message);
});

var data = {num:"1",num1:"123",type:"add"};

req.write(qs.stringify(data));
req.end();