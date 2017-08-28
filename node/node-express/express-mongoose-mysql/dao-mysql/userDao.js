/**
 * Created by Administrator on 2017/2/15.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('./../conf-mysql/db');
var $sql = require('./userSqlMapping');

/**
 * 普通连接
 * mysql.createConnection({options})
 * connection.connect(callback(err)) 连接回调函数
 * connection.on('eventName',callback(err))
 * */
// var connection;
// function handleError () {
//     connection = mysql.createConnection($conf.mysql);
//
//     //连接错误，2秒重试
//     connection.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleError , 2000);
//         }
//     });
//
//     connection.on('error', function (err) {
//         console.log('db error', err);
//         // 如果是连接断开，自动重新连接
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleError();
//         } else {
//             throw err;
//         }
//     });
// }
// handleError();


/**
 * 使用连接池，提升性能
 * mysql.createPool({})
 * */
var pool = mysql.createPool( $conf.mysql );

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        /**
         * 获得连接池连接
         * pool.getConnection(callback(err,connection))
         * 每一次使用连接池最后要使用connection.release()释放连接
         * */
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            /**
             * connection.query(sql语句,sql语句中的??参数([]数组),callback(err,result)) 对mysql数据库进行操作
             * 'INSERT INTO user(id, name, age) VALUES(0,?,?)', //如果插入不成功，则result为undefined
             * */
            connection.query($sql.insert, [param.name, param.age], function(err, result) {/*普通连接和pool连接用同样的query*/
                console.log("add-result",result);
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
            connection.query($sql.delete, id, function(err, result) {
                console.log("del-result",result);
                /**
                 * result.affectedRows  connection.query对数据库中的表影响行数
                 * */
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.age == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }

                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result,fields) {//fields为查询到的字段信息，增删改没有
                console.log("queryById-result",result);
                console.log("fields",fields)
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result,fields) {
                console.log("queryAll-result",result);
                console.log("fields",fields)
                jsonWrite(res, result);
                connection.release();
            });
        });
    }

};


