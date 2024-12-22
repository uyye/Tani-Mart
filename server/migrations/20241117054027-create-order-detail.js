'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:"Orders",
          key:"id"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      productId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"id"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      quantity: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      subTotal: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      authorId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:"Users",
          key:"id"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
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
    await queryInterface.dropTable('OrderDetails');
  }
};