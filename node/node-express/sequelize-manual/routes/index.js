var express = require('express');
var router = express.Router();
var User = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/find', function(req, res, next) {
  User.findAll().then(function(user) {
    res.json(user)
  })
});
router.post('/create', function(req, res, next) {
  User.create({
    firstName: 'John',
    mail:req.body.mail,
    passwd:req.body.passwd
  }).then(function (user) {
    //create的user 只返回影响的字段
    User.findById(user.id).then(function (user) {
      console.log(user.get('fullName'));
      res.json(user)
    })
  }).catch(function (err) {
    next(err) //当增加出错时要捕获错误
  })
});
router.post('/delete', function(req, res, next) {
  User.destroy({
    where: {
      id: req.body.id
    }
  }).then(function (affectedCount) {
    res.json(affectedCount) //返回影响行数
  }).catch(function (err) {
    next(err)
  });
});
router.post('/update', function(req, res, next) {
  User.update({ mail: req.body.mail, title:req.body.title},{where:{id:req.body.id},fields: ['title']}).then(function(affectedCount) { //只修改title
    res.json(affectedCount)
  }).catch(function (err) {
    next(err)
  })
});

module.exports = router;
