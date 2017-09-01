const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();//注意router事第三方中间件，而不是像express中是自带的
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session  = require( 'koa-session');//添加session，koa-generator不会安装这个

const index = require('./routes/index');
const users = require('./routes/api');

const sessionConfig = {
  httpOnly: false
};

app.keys = ['react-koa']; //使用session 要设置app.keys ，否则会报错

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(session(sessionConfig,app)));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => { //第一个参数 ctx 为上下文对象，里面存储有响应和请求
  console.log(ctx.request.search)
  const start = new Date(); //初始时间
  await next();//await next(); 暂停当前的方法，将程序的控制权交给下一个中间件
  const ms = new Date() - start; //其他中间件处理完的时间
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

/**
 * koa使用路由 router.use() , 然后 app.use(router.routes())
 * express使用路由 app.use()
 * */
router.use('/', index.routes(), index.allowedMethods());
router.use('/api', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

/**
 * koa错误处理
 * app.on('error',function(err,ctx){}) //第一个参数为err
 *
 * express错误处理
 * app.use(function(err, req, res, next) {}) //第一个参数为err
 * */
app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;