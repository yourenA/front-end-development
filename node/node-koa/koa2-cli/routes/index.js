import Router from 'koa-router';
const router = new Router();

router.get('/', async function (ctx, next) {
  ctx.state = { //koa-views这些渲染view层的中间件也会默认把ctx.state里面的属性作为view的上下文传入
    title: 'koa2 title'
  };
  await ctx.render('index', {
  });
})
module.exports = router;
