module.exports = function(sequelize,DataTypes){
    return sequelize.define('table_name',{
        table_name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        show_name: {
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true,
        'freezeTableName': true,
        'tableName': 'table_name'
    });
};
