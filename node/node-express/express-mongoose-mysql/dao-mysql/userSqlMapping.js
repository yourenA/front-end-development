/**
 * Created by Administrator on 2017/2/15.
 */
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)', //注意user和VALUES后面的()之前没有空格
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryAll: 'select * from user limit 10'
};

module.exports = user;