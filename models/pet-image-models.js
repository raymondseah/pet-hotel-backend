'use strict';

const {
    Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class petImageModels extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // this.HasMany(models.Users, { foreignKey: 'id', as: 'user_id' })
        }
    };
    petImageModels.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        pet_id:{
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.STRING,
        },
        profile_pic_url: {
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
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
        modelName: 'PetImage',
        tableName: 'petimages',
        underscored: true
    });
    return petImageModels;
};