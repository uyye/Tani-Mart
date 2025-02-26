'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {foreignKey:"authorId"})
      Product.hasMany(models.OrderDetail, {foreignKey:"productId"})
      Product.hasMany(models.CartItem, {foreignKey:"productId"})
      Product.hasMany(models.Presale, {foreignKey:"productId"})
      Product.hasMany(models.Favorite, {foreignKey:"productId"})
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"product name required"
        },
        notNull:{
          msg:"product name required"
        }
      }
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"product image required"
        },
        notNull:{
          msg:"product image required"
        }
      }
    },
    category:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"category required"
        },
        notNull:{
          msg:"category required"
        }
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"product description required"
        },
        notNull:{
          msg:"product description required"
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"product stock required"
        },
        notNull:{
          msg:"product stock required"
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"product price required"
        },
        notNull:{
          msg:"product price required"
        }
      }
    },
    authorId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"userId required"
        },
        notNull:{
          msg:"userId required"
        }
      }
    },
    productStatus:{
      type:DataTypes.STRING,
      defaultValue:"regular",
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"product status required"
        },
        notNull:{
          msg:"product status required"
        }
      }
    },
    commissionRate:{
      type:DataTypes.INTEGER,
      defaultValue:10,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"commision rate required"
        },
        notNull:{
          msg:"commision rate required"
        }
      }
    },
    permission:{
      type:DataTypes.STRING
    }
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};