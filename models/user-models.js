'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class userModels extends Model {

    static associate(models) {
      
      
    }
  };
  userModels.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING,
      require: true
    },
    last_name: {
      type: DataTypes.STRING,
      require: true
    },
    email: {
      type: DataTypes.STRING,
      require: true
    },
    pwsalt: {
      allowNull: false,
      type: DataTypes.STRING,
      require: true
    },
    hash: {
      allowNull: false,
      type: DataTypes.STRING,
      required: true
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
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return userModels;
};