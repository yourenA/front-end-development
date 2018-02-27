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
res.sendStatus() |  设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.status(num)  |  设置http返回状态码

res.status(401);
res.json(json);

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

 ```<%- include('components/nav') %>``` 在一个ejs中引入另一个ejs

## 解决跨域问题
```
	//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});
```
* 如果跨域使用session 需要设置```res.header("Access-Control-Allow-Credentials", true);```,并且```Access-Control-Allow-Origin```不能使用*号，必须指定明确的、与请求网页一致的域名。
然后ajax请求需要设置```withCredentials = true```

* 使用cros

1. 直接使用cros库来解决跨域，这时候不需要设置withCredentials,但是无法记录服务端session
```
var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```
2. 
``` 多个白白名单，设置credentials:true记录session
var whitelist = ['http://localhost:8000', 'http://localhost:3001']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true
}

app.use(cors(corsOptions))
```

## config-lite
```
var config = require('config-lite');
```
config0lite会自动读取config/default.js文件

## express-session
session的认证机制离不开cookie，需要同时使用cookieParser 中间件
```
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
...
//config即为config-lite定义的配置内容
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge// 过期时间，即maxAge后session和相应的cookie失效过期 
    //如果maxAge不设置，默认为null，这样的expire的时间就是浏览器的关闭时间，即每次关闭浏览器的时候，session都会失效
  },
  store: new MongoStore({// store将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

```


**设置session**
```
req.session.user = null;
```
**获取session**
```
var user = req.session.user
```
## cookie-parser

**cookie创建**    
``` res.cookie(name, value [, options]);```
express就会将其填入Response Header中的Set-Cookie，达到在**浏览器中设置cookie**的作用。
```res.clearCookie(name [, options]);```
直接删除浏览器中的cookie

**使用cookie-parser读取**

```
var cookieParser = require('cookie-parser');

var app = express();
//不使用签名
app.use(cookiePareser());

//若需要使用签名，需要指定一个secret,字符串,否者会报错
app.use(cookiePareser('Simon'));

app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies) //读取请求带过来的cookie
})
```

##body-parser
```
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
//返回一个只解析json的中间件，可以支持任何unicode编码的消息体，同时也支持gzip和deflate编码。最后保存的数据都放在req.body对象上
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
```
如果你的接口要求post 上来的数据格式是这样的:
```{"data":{"name":"张三","age":25}}```
后端express 进过 bodyParser 的解析后,可以这样读取到数据
```
req.body.data.name (获取到张三)
req.body.data.age (获取到年龄)
```
但是这里是有前提的,客户端请求接口时必须指名请求头类型 Content-Type=application/json       
bodyParser 发现这样类型的请求头后,会自动将 body 里的 json 格式数据正确解析

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
req.flash('success','登录成功'); //设置flash
res.redirect('login');

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString(); //将flash值赋值在模板中 
  res.locals.error = req.flash('error').toString();
  next();
});
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
## 使用crypto（md5）加密
```
var crypto = require('crypto');
exports.md5 = function(str){
    if(!str){
        return null;
    }
    return crypto.createHash('md5').update(str).digest('hex');
};
```
## 使用multer 获取上传文件

>Multer 不会为你添加任何扩展名, 你的程序应该返回一个完整的文件名。表单记得加上  enctype=‘multipart/form-data’

* 简单操作(上传后无法得到原来后缀的文件)
```
var multer=require('multer');
var upload = multer({ dest: 'uploads/' }) //定义存储上传文件的路径,以项目的根目录为标准，并不是当前js文件目录。文件夹需要提前建立，上传后的文佳将会没有后缀

router.post('/profile', upload.single('avatar'), function (req, res, next) {
 res.json({file:req.file,body:req.body})
  // req.file 是 `avatar` 文件的信息 注意是file
  // req.body 将具有文本域数据, 如果存在的话
})

router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) { //12为最大的上传数量
res.json({file:req.file,body:req.body})
  // req.files 是 `photos` 文件数组的信息 注意事files
  // req.body 将具有文本域数据, 如果存在的话
})
```

* 使用DiskStorage磁盘存储
```
var multer=require('multer');
var storage = multer.diskStorage({
  destination: 'tmp/my-uploads',//字符串，运行express的时候就帮你自动创建，并不是上传文件的时候才建
  destination: function (req, file, cb) { //回调函数，需要自己创建文件夹
    cb(null, 'tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' + file.originalname); //为上传的文件添加后缀
  }
})

var upload = multer({ 
    storage: storage ,
    limits:{
        fileSize: 512000
    }
    });
router.post('/profile', upload.single('avatar'), function (req, res, next) {
  res.json({file:req.file,body:req.body})
  // req.file 是 `avatar` 文件的信息 注意是file
  // req.body 将具有文本域数据, 如果存在的话
},function (err,req,res,next) { //处理上传过程中失败中间件
   if (err.code === 'LIMIT_FILE_SIZE') {
     res.send({ result: 'fail', error: { code: 1001, message: 'File is too big!!!!' } })
     return
   }
 })
```

## 下载buffer
```
    var importData=[[1,2],[1,2]];
    var buffer = xlsx.build([{name: "result", data: importData}]);
    res.set('Content-Type', 'application/vnd.openxmlformats');
    res.set('Content-Disposition', 'attachment; filename=result.xlsx');
    res.send(buffer);
```


