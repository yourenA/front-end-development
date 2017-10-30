var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入express-router
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//如果使用ejs模板引擎解析html,使用下面的设置
// app.set('views', path.join(__dirname, 'build'));
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件，如果静态文件下面有index.html那么根目录会指向这个index.html文件，而不会指向根路由
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/static', express.static('public'));使用虚拟的静态目录http://localhost:3000/static/images/kitten.jpg

//app.METHOD(PATH, HANDLER)使用全局的路由，如果使用了全局的路由，那局部的express-router路由就不会起作用
// app.get('/',function (req,res) {
//   console.log('全局get路由')
// })
app.use('/', routes);//使用express-router路由
app.use('/users', users);


// catch 404 and forward to error handler
//在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。
//也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');//因为404不是错误处理中间件，所以需要自己定义error
  err.status = 404;
  console.log('404')
  next(err);//next进入下一个中间件
});

// error handlers

// development error handler
// will print stacktrace
//错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)：
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { //全局错误中间件。第一个参数err接收404错误的next(err);因为没有设置next(err)，所有当有development错误处理的时候，production错误处理将不起作用
    res.status(err.status || 500);
    console.log('development')
    res.render('error', {
      message: err.message,//err.message为new Error()中的参数
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('production')
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
