var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('局部路由')
  res.render('index', { title: 'Express' });
});

module.exports = router;
