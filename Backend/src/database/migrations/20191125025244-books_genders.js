'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books_genders', { 
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: { model: 'books', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      gender_id: {
        type: Sequelize.INTEGER,
        references: { model: 'genders', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('books_genders');
  }
};
