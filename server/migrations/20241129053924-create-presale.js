'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references:{
          model:"Products",
          key:"id",
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      startDate: {
        allowNull:false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull:false,
        type: Sequelize.DATE
      },
      price: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      discount: {
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
    await queryInterface.dropTable('Presales');
  }
};