'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Presale.belongsTo(models.Product, {foreignKey:"productId"})
    }
  }
  Presale.init({
    productId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Presale',
  });
  return Presale;
};