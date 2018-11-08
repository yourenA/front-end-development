# koa

## 使用 koa-generator 创建 koa
```
$ npm install -g koa-generator  
```
>  koa-generator 中自动集成 nodemon 和 pm2
* 创建 koa1
```
$ koa -e koa-cli
```
koa1 使用 generator/yield  来实现中间件

* 创建 koa2 (下文基于使用koa2)
```
koa2 -e koa2-cli
```
koa2 使用 async/await  来实现中间件

### 使用koa2

#### koa2使用中间件
```
app.use(async (ctx, next) => { 
  const result = await 异步方法 
});
```
 ctx 为上下文对象，里面存储有响应和请求相关内容
 * ctx.req : Node 的 request 对象。
 * ctx.res : Node 的 response 对象。
 * ctx.request : Koa 的 Request 对象。
 * ctx.response : Koa 的 Response 对象。
 * ctx.app : 应用实例引用。
 
 - ctx.request
    - ctx.request.method = ctx.method : 请求方法
    - ctx.request.url = ctx.url : 请求地址
    - ctx.request.path = ctx.path : 请求路径名
    - ctx.request.header = ctx.header : 请求头
    - ctx.request.query = ctx.query : 请求url中?后面的部分(JSON对象)
    - ctx.request.querystring : 请求url中?后面的部分(字符串)
    - ctx.request.search : 获取查询参数字符串，包含 ?。
    - ctx.request.body : 获取请求体(注意不能写成ctx.body , ctx.body 是响应体)
    - ......
 
 - ctx.response
    - ctx.response.body = ctx.body : 响应体
    - ctx.response.status = ctx.status : 响应状态码
    - ctx.response.redirect = ctx.redirect :  重定向到对应 url
    - ctx.response.set(field, value) : 设置响应header
    - ......
 
 ctx.session.xxx 设置/获取 session
 
 - ctx.state({}) 通过这个state可以储存一些的数据,比如用户数据,
 另外类似koa-views这些渲染view层的中间件也会默认把ctx.state里面的属性作为view的上下文传入。
 
 - ctx.render() 渲染视图模板
 
 - router.prefix('api') 设置每个路由的前缀
 
