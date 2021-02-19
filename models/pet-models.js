'use strict';

const {
    Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class petModels extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // this.HasMany(models.Users, { foreignKey: 'id', as: 'user_id' })
        }
    };
    petModels.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        client_id:{
            //changed to true first to test the postman before implementing this
            allowNull: true,
            type: DataTypes.INTEGER,
            // references: {model:'user', key:'id'},
        },
        email:{
            type: DataTypes.STRING,
        },
        pet_name: {
            allowNull: false,
            type: DataTypes.STRING,
            require: true
        },
        pet_type: {
            allowNull: false,
            type: DataTypes.STRING,
            require: true
        },
        pet_breed: {
            allowNull: false,
            type: DataTypes.STRING,
            require: true
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
        modelName: 'Pet',
        tableName: 'pets',
        underscored: true
    });
    return petModels;
};