'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:"Carts",
          key:"id",
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      productId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"id",
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      quantity: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};