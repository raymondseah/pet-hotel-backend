'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('petimages', {
        id: {
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.BLOB("long"),
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
    await queryInterface.dropTable('Petimages');
  }
};