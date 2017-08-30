'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('unit', [
			{
				name: 'F',
				category_id: 1,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'µF',
				category_id: 1,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'pF',
				category_id: 1,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'K',
				category_id: 10,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'M',
				category_id: 10,
				created_at: new Date(),
				updated_at: new Date()
			}
		]);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable('unit');
	}
};
