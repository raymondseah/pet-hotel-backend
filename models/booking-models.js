'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookingModels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bookingModels.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email:{
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    pet_id: {
      type: DataTypes.INTEGER
    },
    arrival_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    departure_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    client_notes: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    employee_notes: {
      type: DataTypes.STRING
    },
    fee: {
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    underscored: true
  });
  return bookingModels;
};