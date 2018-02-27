/**
 * Created by llan on 2017/6/9.
 */
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
let router = new Router();
const koaBody = require('koa-body');
const views = require('koa-views');
const path = require('path');
app.use(views(path.join(__dirname, 'public'), {map: {html: 'nunjucks'}}));
app.use(koaBody());
app.use(require('koa-static')(path.join(__dirname, 'public')));
const ffi = require('ffi');
let product = ffi.Library('./product', {
    'factorial': ['uint64', ['int']],
    'add': ['int', ['int', 'int']],
    'minus': ['int', ['int', 'int']],
    'multiply': ['int', ['int', 'int']],
    'compare': ['string', ['int', 'int']]
});
router.get('/', async(ctx)=> {
    await ctx.render('./html/index.html', {
        title: "通过计算测试调用dll/dylib/so方法"
    })
});
router.post('/result', (ctx)=> {
    let max = ctx.request.body.max;
    let result = product.factorial(max);
    return ctx.body = {
        status: 200,
        result: result
    }
});
router.post('/add', async(ctx)=> {
    let {first, second} = ctx.request.body;
    let result = product.add(first, second);
    await new Promise(resolve => {
        setTimeout(resolve, 300000);
    });
    return ctx.body = {
        status: 200,
        result: result
    }
});
router.post('/minus', (ctx)=> {
    let {first, second} = ctx.request.body;
    let result = product.minus(first, second);
    return ctx.body = {
        status: 200,
        result: result
    }
});
router.post('/multiply', (ctx)=> {
    let {first, second} = ctx.request.body;
    let result = product.multiply(first, second);
    return ctx.body = {
        status: 200,
        result: result
    }
});
router.post('/compare', (ctx)=> {
    let {first, second} = ctx.request.body;
    let result = product.compare(first, second);
    return ctx.body = {
        status: 200,
        result: result
    }
});
app.use(router.routes())
    .use(router.allowedMethods());

let server = app.listen(3000, '0.0.0.0', ()=> {
    console.log('app listening at 3000');
});
server.setTimeout(400000);
