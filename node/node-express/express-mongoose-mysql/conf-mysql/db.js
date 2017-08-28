/**
 * Created by Administrator on 2017/2/15.
 */
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database:'test_db1', // 确保test_db1中有user表
        port: 3306
    }
};