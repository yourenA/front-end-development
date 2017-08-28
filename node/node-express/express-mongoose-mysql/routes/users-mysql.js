var express = require('express');
var router = express.Router();

var userDao =require('./../dao-mysql/userDao');
/*mysql操作*/
// 增加用户
router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});
router.get('/deleteUser', function(req, res, next) {
  userDao.delete(req, res, next);
});
router.get('/queryById', function(req, res, next) {
  userDao.queryById(req, res, next);
});
router.get('/queryAll', function(req, res, next) {
  userDao.queryAll(req, res, next);
});
module.exports = router;
