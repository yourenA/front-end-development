'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require( './../config.json')[env];
var db        = {};
var sequelize
if (config.use_env_variable) {
   sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
   sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.associate) {
    db[modelName].options.associate(db);
  }
});

const connection = async () => {
  // 链接数据库并重新生成表
  // return await client.sync({force:true});
  // 链接数据库
  return await sequelize.sync();
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.connection = connection;

module.exports = db;
