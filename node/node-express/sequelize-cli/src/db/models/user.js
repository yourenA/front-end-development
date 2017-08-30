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
        permission: {
            type:DataTypes.INTEGER,
            values:[1,2],
            allowNull: false,
            defaultValue: 2,
            comment:'权限 1为管理员 2为普通用户'
        }
    },{

        underscored: true,
        'freezeTableName': true,
        'tableName': 'user'
    });
};
