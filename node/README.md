# Node.js

* Node.js 是一个基于 **Chrome V8 引擎**的 **JavaScript** 运行环境。 
* Node.js 使用了一个**事件驱动**、**非阻塞式 I/O** 的模型，使其轻量又高效。 
* Node.js 的包管理器 npm，是全球最大的开源库生态系统。

```
$ node xxx.js //使用node来运行js
```
>使用 nodemon 或 supervisor 热更新node

## HTTP 模块
```
const http = require('http'); //node 内置中间件

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => { //回调方法(req, res)=>{} req为请求 res为响应
  // 获得HTTP请求的method和url:
  console.log(req.method + ': ' + req.url);
  
  // 在回调函数中区分不同url和method ,然后进行不同的处理，向客户端返回不同的结果
  
  res.statusCode = 200; 
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
```

## url 模块
```
const url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));//url.parse()解析url地址
```
==>
```
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/path/to/file',
  path: '/path/to/file?query=string',
  href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' }
```

## path 模块

变量  *__dirname* 表示当前js文件的目录
```
const path = require('path');

// 解析当前目录:
const workDir = path.resolve('.'); 
// '/Users/michael'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
const filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'
```

```
path.join(__dirname,'c','main.js')
//返回 D:\c\main.js  ,__dirname表示当前运行环境绝对路径

path.resolve()//可以想象现在你在shell下面，从左到右运行一遍cd path命令，最终获取的绝对路径/文件名，就是这个接口所返回的结果了
//默认是在当前的目录下 console.log( path.resolve('') )
```
对比
```
const path = require('path'); 
let myPath = path.join(__dirname,'/img/so'); 
let myPath2 = path.join(__dirname,'./img/so'); 
let myPath3 = path.resolve(__dirname,'/img/so'); //到根目录
let myPath4 = path.resolve(__dirname,'./img/so'); 
console.log(__dirname); //D:\myProgram\test 
console.log(myPath); //D:\myProgram\test\img\so 
console.log(myPath2); //D:\myProgram\test\img\so 
console.log(myPath3); //D:\img\so<br> 
console.log(myPath4); //D:\myProgram\test\img\so
```

## fs 模块
* 所有的方法都有异步和同步的形式。
* err 是回调方法的第一个参数

异步方法`
```
fs.unlink('/tmp/hello', (err) => { 
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});
```
同步方法
```
fs.unlinkSync('/tmp/hello');
console.log('成功删除 /tmp/hello');
```

* stat获取文件信息(fs其他方法使用类似)
```
fs.stat('index.txt',function(err,stats){
　　if(err){
　　　　return err;
　　}
　　console.log(stats);
　　console.log("读取文件信息成功");
　　console.log('是否为文件(isFile) ? ' + stats.isFile());
　　console.log('是否为目录(isDirectory) ? ' + stats.isDirectory());
});
```

## cross-env 跨平台地设置及使用环境变量
```
npm i --save-dev cross-env
```

```
  "scripts": {
    "start": "cross-env NODE_ENV=development node index.js",
    "production": "cross-env NODE_ENV=production node index.js",
    "production-seeds": "cross-env NODE_ENV=production node_modules/.bin/sequelize db:seed:all",
    "development-seeds": "cross-env NODE_ENV=development node_modules/.bin/sequelize db:seed:all"
  },
```