'use strict';
const {
  Model
} = require('sequelize');
const { underscoredIf } = require('sequelize/types/lib/utils');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
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
      allowNull:false,
      type:DataTypes.STRING,
      require: true
    },
    hash: {
      allowNull:false,
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
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};