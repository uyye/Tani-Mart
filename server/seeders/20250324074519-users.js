'use strict';

const { hashing } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
  const hashedPassword = await hashing(process.env.DEFAULT_ADMIN);

   await queryInterface.bulkInsert("Users", [{
    name:"Ikram",
    password:hashedPassword,
    address:"Bantaeng",
    phoneNumber:"087777635123",
    role:"admin",
    bankName:"BNI",
    bankAccountNumber:"00010000",
    createdAt:new Date(),
    updatedAt:new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users",null, {})
  }
};
