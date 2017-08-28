/**
 * Created by Administrator on 2017/8/28.
 */
var Sequelize = require('sequelize');//注意mysql是驱动，我们不直接使用，但是sequelize会用。
var config = require('.././config/config');
//第一步，创建一个sequelize对象实例：
var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.passwd,
    {
        'dialect': 'mysql',
        'host': config.db.host,
        'port': config.db.port,
        'pool': {
            max: 5, // 连接池中最大连接数量
            min: 0, // 连接池中最小连接数量
            idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        }
    }
);

module.exports=sequelize;