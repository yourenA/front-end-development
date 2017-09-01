var express = require('express');
var router = express.Router();
var dbModels=require('../src/db/models/index').sequelize.models;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getUser',function (req,res,next) {
  // db.sequelize.models.user 获得sequelize中定义的某个model
  dbModels.user.findOne({
    where: {
      id: 1,
    }
  }).then(function (user) {
    res.json(user)
  });
})

router.post('/createUnit',function (req,res,next) {
  // db.sequelize.models.user 获得sequelize中定义的某个model
  dbModels.unit.create({name:req.body.name,category_id:1}).then(function (unit) {
    res.json(unit)
  });
})
router.post('/createCategory',function (req,res,next) {
  // db.sequelize.models.user 获得sequelize中定义的某个model
  dbModels.category.create({name:req.body.name}).then(function (unit) {
    res.json(unit)
  });
})
router.post('/deleteUnit',function (req,res,next) {
  // db.sequelize.models.user 获得sequelize中定义的某个model
  dbModels.unit.destroy({where:{id:req.body.id}}).then(function (unit) {
    res.json(unit)
  });
})
module.exports = router;
