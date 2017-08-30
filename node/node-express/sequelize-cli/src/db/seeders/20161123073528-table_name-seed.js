'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('table_name', [
      {'table_name': "Capacitor",'show_name':"Capacitor",'created_at': new Date(), 'updated_at': new Date() },//每一行的内容
      {'table_name': "Connector",'show_name':"Connector",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "Diode",'show_name':"Diode",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "IC",'show_name':"IC",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "Inductor",'show_name':"Inductor",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "MISC",'show_name':"MISC",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "MOSFET",'show_name':"MOSFET",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "Resistor",'show_name':"Resistor",'created_at': new Date(), 'updated_at': new Date() },
      {'table_name': "Transistor",'show_name':"Transistor",'created_at': new Date(), 'updated_at': new Date() }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
