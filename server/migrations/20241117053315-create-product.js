'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      image: {
        type: Sequelize.STRING,
        allowNull:false
      },
      category:{
        type:Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price: {
        allowNull:false,
        type: Sequelize.INTEGER
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
      productStatus:{
        type:Sequelize.STRING,
        defaultValue:"regular",
        allowNull:false
      },
      commissionRate:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:10
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
    await queryInterface.dropTable('Products');
  }
};