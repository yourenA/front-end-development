/**
 * Created by llan on 2016/11/23.
 */
module.exports = function (sequelize, DataTypes) {
	var category = sequelize.define('category', {
		name: {
			type: DataTypes.STRING
		}
	}, {
		underscored: true,
		'freezeTableName': true,
		'tableName': 'category',
		associate: function (models) { //associate表与表之间的联系，参数models为定义的所有表
			category.hasMany(models['unit']); //unit 添加 category_id
			category.belongsTo(models['table_name']); // category 添加 table_name_id
		}
	});
	return category;
};
