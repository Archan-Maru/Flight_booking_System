'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Flights', 'flightNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Flights', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Flights', 'price');

    await queryInterface.changeColumn('Flights', 'flightNumber', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
