/**
 * Created by llan on 2016/11/23.
 */
module.exports = function (sequelize, DataTypes) {
	var unit = sequelize.define('unit', {
		name: {
			type: DataTypes.STRING
		}
	}, {
		timestamps: true,
		// 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
		// paranoid 属性只在启用 timestamps 时适用
		paranoid: true,
		underscored: true,
		'freezeTableName': true,
		'tableName': 'unit',
			associate: function (models) {
				unit.belongsTo(models['category']);//unit 添加 category_id
			}

	});
	return unit;
};
