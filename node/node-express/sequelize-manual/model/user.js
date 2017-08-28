/**
 * Created by aresn on 16/5/11.
 */
var Sequelize = require('sequelize');
var sequelize = require('./index');
var BaseModel = require('./base');
//第二步，定义模型User，告诉sequelize如何映射数据库表：
/*
 * sequelize.define(name,{fields},{opt})
 * @name:默认表名为names，注意后面会自动添加“s”
 * @fields:指定列名和数据类型
 * opt:额外的配置
 */

var User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,//主键
        defaultValue: BaseModel.uid() //默认值
    },
    mail: {
        type: Sequelize.STRING(50),
        allowNull: false,  //是否允许为空
        validate: {         //模型验证
            isEmail: true,            // 检测邮箱格式 (foo@bar.com)
        }
    },
    passwd: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // 在数据库中在字段名称显示first_name
    },
    lastName: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.STRING,
        get: function () {
            var firstName = this.getDataValue('firstName');//this.getDataValue()获取当前行的某个字段
            var lastName = this.getDataValue('lastName');
            // 'this' allows you to access attributes of the instance
            return firstName + lastName;
        },
    },
    title: {
        type: Sequelize.STRING,
        set: function (val) { //创建内容的时候，将内容设为大写，参数val为输入的内容
            this.setDataValue('title', val.toUpperCase());
        }
    },
    myDate: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
}, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true, // false为不要添加时间戳属性 (updatedAt, createdAt)
    deleteAt: true //使用逻辑删除。设置为true后，调用 destroy 方法时将不会删队模型，而是设置一个 deletedAt 列。此设置需要 timestamps=true

});
//我们把通过sequelize.define()返回的User称为Model，它表示一个数据模型。
//我们把通过findOne.findAll()返回的一个或一组对象称为Model实例


/**
 * sequelize.sync()同步模型到数据库
 * [options.force=false] 设置为 true，会在创建表前先删除原表，即：DROP TABLE IF EXISTS
 * [options.match] 添加匹配规则，只重建匹配的表，在force: true时非常有用
 * */
User.sync({force:false}).then(function () {
    // 已创建数据表
    return User.create({
        firstName: 'John',
        lastName: 'Hancock',
        passwd: '12345',
        mail: '5@qq.com',
        title: 'title'
    }).then(function (employee) {
        console.log(employee.get('fullName')); // John Doe (SENIOR ENGINEER)
    });
});
module.exports = User;