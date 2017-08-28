var express = require('express');
var router = express.Router();

//路由级别中间件router.use()或者router.VERB()
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user){ //req.session.user 如果session中没有user 则跳转到/login
		console.log(req.session.user[0].username)
		var username=req.session.user[0].username;
		res.render("index",{ title :username,username:username });
	}else{
		res.redirect('/login');
	}
});


/*注册路由*/
/* GET home page. */
router.get('/register', function(req, res, next) {
	res.render("register",{ title : "register" });
});
router.post('/register', function(req,res,next){
	var newUser=req.body;
	console.log(req.body)//var bodyParser = require('body-parser');
	var userModel=global.dbHandle.getModel("user"); //获取模型
	userModel.create(newUser,function(err){ //插入数据，实际上需要判断一下是否已经有数据
		if(err){
			console.log("注册失败");
		}else{
			console.log("注册信息写入数据库啦！！！");
			res.json(true);
		}
	});
});

// 登陆路由
router.get('/login', function(req, res, next) {
	res.render("login",{ title : "login" });
});
router.post('/login', function(req,res,next){
	var loginUser=req.body;
	console.log(req.body);//var bodyParser = require('body-parser');
	var wherestr={ username: loginUser.username, password:loginUser.password};
	var userModel=global.dbHandle.getModel("user");
	userModel.find(wherestr,function(err,docs){//docs返回全部的数据
		if(err){
			console.log("登陆失败");
		}else if (docs.length){
			console.log("登陆成功！！！");
			req.session.user=docs; //req.session设置session
			console.log(docs)
			res.json({msg:'登录成功'});
		}else {
			res.status(401)
			res.json({msg:'登录失败'});
		}
	});
});

router.post('/logout',function (req,res,next) {
	if(!req.session.user){ //req.session.user 如果session中没有user 则跳转到/login
		res.status(401);
		return res.json({ //要使用return 不然会继续执行next()，然后报错
			"message": "登录令牌无效或过期",
			"status_code": 401
		})
	}
	next()
}, function(req,res,next){
	req.session.user=null;
	res.redirect('/')
})



router.get('/init',function (req,res,next) {
	if(!req.session.user){ //req.session.user 如果session中没有user 则跳转到/login
		res.status(401);
		return res.json({ //要使用return 不然会继续执行next()，然后报错
			"message": "登录令牌无效或过期",
			"status_code": 401
		})
	}
	next()

}, function(req,res,next){/*请求参数，相应参数和负责把错误信息运送出来的next参数*/
	var noteModel=global.dbHandle.getModel("note");/*获取note数据库模型，模型能直接对数据库进行操作*/
	noteModel.find({},function(err,notes){ //find({}) 查找全部
		if(err){
			return next(err);
		}else{
			res.json(notes);
		}
	})
});

router.post('/addNote', function(req,res,next){
	var newNote=req.body;
	var noteModel=global.dbHandle.getModel("note");
	noteModel.create(newNote,function(err){
		if(err){
			return next(err);
		}else{
			console.log("笔记已经成功写入数据库啦！！！");
			noteModel.find({},function(err,notes){ //将数据写入后在查找全部数据
				if(err){
					console.log("咦？是怎么回事呢？");
				}else{
					res.json(notes);
				}
			});
		}
	});
});

 router.post('/deleteNote', function(req,res,next){
 	var  delete_date=req.body.date;
 	var noteModel=global.dbHandle.getModel("note");
 	noteModel.remove({date : delete_date},function(err){
 		if(err){
 			return next(err);/*错误的话，把错误给运出来*/
 		}else{
 			console.log("笔记已经被你残忍的给删除了啊...");
 			noteModel.find({},function(err,notes){
 				if(err){
 					console.log("我也不知道怎么回事...明明已经删除了啊...");
 				}else{
 					res.json(notes);
 				}
 			});
 		}
 	});
 });




module.exports = router;
