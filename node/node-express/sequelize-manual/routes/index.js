var express = require('express');
var router = express.Router();
var User = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup', function(req, res, next) {
});
router.post('/signin', function(req, res, next) {
});
router.post('/info', function(req, res, next) {
});

module.exports = router;
