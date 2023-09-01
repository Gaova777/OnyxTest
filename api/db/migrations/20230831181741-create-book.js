'use strict';
const {BOOK_TABLE,BookSchema} = require('../models/book.model') 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(BOOK_TABLE, BookSchema)
  },

  async down (queryInterface) {
  await  queryInterface.dropTable(BOOK_TABLE)
  }
};
