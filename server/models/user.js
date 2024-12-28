'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {foreignKey:"authorId"})
      User.hasMany(models.Order, {foreignKey:"userId"})
      User.hasMany(models.Cart, {foreignKey:"userId"})
      User.hasMany(models.Payment, {foreignKey:"authorId"})
      User.hasMany(models.OrderDetail, {foreignKey:"authorId"})
      User.hasMany(models.Favorite, {foreignKey:"userId"})
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"username required!"
        },
        notNull:{
          msg:"username required!"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"password required!"
        },
        notNull:{
          msg:"password required!"
        }
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"address required!"
        },
        notNull:{
          msg:"address required!"
        }
      }
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"phone number required!"
        },
        notNull:{
          msg:"phone number required!"
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"role required"
        },
        notNull:{
          msg:"role required"
        }
      }
    },
    bankName:{
      type:DataTypes.STRING
    },
    bankAccountNumber:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, option)=>{
    user.password = await hashing(user.password)
  })
  return User;
};