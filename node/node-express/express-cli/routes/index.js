var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
// 该路由使用的中间件，当前定义的router都会使用到这个中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();//如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。
});

router.get('/', function(req, res, next) {
  console.log('局部路由')
  res.render('index', { title: 'Express' }) //终结请求-响应循环
});

var multer=require('multer');
var upload = multer({ dest: 'uploads/' }) //定义存储上传文件的路径,以项目的根目录为标准，并不是当前js文件目录。文件夹需要提前建立，上传后的文佳将会没有后缀

router.post('/upload', upload.single('files'), function (req, res, next) {
  console.log(req.file)
  res.json({file:req.file})
  // req.file 是 `files` 文件的信息 注意是file
  // req.body 将具有文本域数据, 如果存在的话
})
//定义多个路由 CURD,创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作
router.get('/articles', middleware);//全部文章
router.get('/articles/:id', middleware);//读取某一篇文章 R
router.post('/articles',checkLogin, middleware);//创建一篇文章 C，先执行checkLogin中间件，如果checkLogin中条件不满足，没有调用到next(),那就不会执行middleware)
router.put('/articles/:id',checkLogin, middleware);//更新某一篇文章 U
router.delete('/articles/:id',checkLogin, middleware);//删除某一篇文章 D

function checkLogin(req, res, next) {//权限控制中间件
  if (!req.session.user) {
    req.flash('error', '未登录');
    return res.redirect('/signin');
  }
  next();//不要忘记调用next()函数，否则Express.js 将无法进行后续的处理
}

function middleware(req,res,next) {
  var postId = req.params.id; //获取路径上面的 :id
  var author = req.query.author; //获取路径上面的 ?author=xxx
  console.log('middleware')
}

module.exports = router;
