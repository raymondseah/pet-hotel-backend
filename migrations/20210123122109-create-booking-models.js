'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      pet_id: {
        type: Sequelize.INTEGER
      },
      pet_name:{
        type: Sequelize.STRING
      },
      arrival_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      client_notes: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      employee_notes: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};