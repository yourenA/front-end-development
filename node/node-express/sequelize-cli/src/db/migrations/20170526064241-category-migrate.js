'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('category', [
			{
				name: 'Capacitors',
				table_name_id: 1,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Connectors, Interconnects',
				table_name_id: 2,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Discrete Semiconductor Products',
				table_name_id: 3,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Circuit Protection',
				table_name_id: 3,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Integrated Circuits (ICs)',
				table_name_id: 4,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Inductors, Coils, Chokes',
				table_name_id: 5,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Filters',
				table_name_id: 5,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Crystals and Oscillators',
				table_name_id: 6,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Discrete Semiconductor Products',
				table_name_id: 7,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Resistors',
				table_name_id: 8,
				created_at: new Date(),
				updated_at: new Date()
			},
			{
				name: 'Discrete Semiconductor Products',
				table_name_id: 9,
				created_at: new Date(),
				updated_at: new Date()
			}
		]);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable('category');
	}
};
