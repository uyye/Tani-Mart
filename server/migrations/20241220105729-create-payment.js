'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
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
      authorId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:"Users",
          key:"id"
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      amount: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull:false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Payments');
  }
};