'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn('Todos', 'test', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn('Todos', 'test')
  }
};
