module.exports = function(sequelize,DataTypes){
    return sequelize.define('user',{
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            comment:'用户名'
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
            comment:'用户密码'
        },
        password2: {
            type:DataTypes.STRING,
            comment:'用户密码'
        },
        password3: {
            type:DataTypes.STRING,
            comment:'用户密码'
        },
        password4: {
            type:DataTypes.STRING,
            comment:'用户密码'
        },
        permission: {
            type:DataTypes.INTEGER,
            values:[1,2],
            allowNull: false,
            defaultValue: 2,
            comment:'权限 1为管理员 2为普通用户'
        }
    },{
        paranoid:true,//paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        underscored: true,
        freezeTableName: true,
        tableName: 'user'
    });
};
