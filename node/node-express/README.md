# EXPRESS

## 请求相关

* req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}
* req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
* req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}

## 响应相关

方法             |  描述
-----------------|----------------------           
res.download()   |  提示下载文件。
res.end()        |  终结响应处理流程。
res.json()       |  发送一个 JSON 格式的响应。
res.jsonp()      |  发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect()   |  重定向请求。
res.render()     |  渲染视图模板。
res.send()       |  发送各种类型的响应。
res.sendFile     |  以八位字节流的形式发送文件。
res.sendStatus() |  设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

## express.Router

**routes/users.js**
```
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  res.send('hello, ' + req.params.name);
});

module.exports = router;
```
**index.js**
```
var userRouter = require('./routes/users');
app.use('/users', userRouter); // 路径/users/:name
```

## 设置变量
```
app.set('port', (process.env.PORT || 5000));//set设置端口
app.get('port');//get获取端口
```

## EJS模板
1. <% code %>：运行 JavaScript 代码，不输出
2. <%= code %>：显示转义后的 HTML内容
3. <%- code %>：显示原始 HTML 内容

> 注意：当 code 比如为 `<h1>hello</h1>` 这种字符串时，`<%= code %>` 会原样输出 `<h1>hello</h1>`，而 `<%- code %>` 则会显示 H1 大的 hello 字符串。

## 解决跨域问题
```
	//设置跨域访问
	app.all('*', function(req, res, next) {
	   res.header("Access-Control-Allow-Origin", "*");//*表示允许的域名地址，本地则为'http://localhost' 
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    next();//设置next才能进入到具体的路由
	});
```

## config-lite
```
var config = require('config-lite');
```
config0lite会自动读取config/default.js文件

## express-session
```
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
...
//config即为config-lite定义的配置内容
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// store将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

```
通过 req.session.user 获取session

## connect-flash 
需要安装一个 express-session 模块，因为 connect-flash 是需要存储在 session 模块
```
var flash = require('connect-flash');
// flash 中间价，用来显示通知
app.use(flash());

if(!user || user.name === ''){
  req.flash('error','用户不存在');//设置名为error的flash值
  return res.redirect('login');
}
if(req.body.password != user.password){
  req.flash('error','密码不对');
  return res.redirect('login');
}
req.flash('info','登录成功');
res.redirect('login');

res.locals.errors = req.flash('error');//获取名为error的flash值
res.locals.infos = req.flash('info');
```
  flash 是 session 中一个用于存储信息的特殊区域。消息写入到 flash 中，在跳转目标页中显示该消息。
  flash 是配置 redirect 一同使用的，以确保消息在目标页面中可用。
flash 可用于一次性的消息提示，比如注册，登录页面，当你再次刷新时，flash就没有提示消息了。

## app.local与res.local
```
app.local.blog={
    name:value  //通常用来存储常量
}

res.locals.user=req.session.user //通常用来存储变量
```

使用ejs拿到响应的blog与user

## express-formidable处理表单与文件上传
通过```req.fields```获取form中的内容，通过```req.files```获取form中上传的文件
```
var sha1 = require('sha1');//使用sha1加密密码
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));

var name = req.fields.name;//普通输入input <input type='text' name='name' />
var gender = req.fields.gender;
var bio = req.fields.bio;
var avatar = req.files.avatar.path.split(path.sep).pop();//上传文件files <input type="file" name="avatar" />
var password = req.fields.password;
var repassword = req.fields.repassword;
password = sha1(password);
```

## 使用markdown 解析文章的内容
```
var marked = require('marked');
post.content = marked(post.content);//post.content为发送过来的内容
```

## mocha 和 supertest 是常用的测试组合，通常用来测试 restful 的 api 接口

