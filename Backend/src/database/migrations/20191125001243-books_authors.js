'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books_authors', { 
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
      author_id: {
        type: Sequelize.INTEGER,
        references: { model: 'authors', key: 'id' },
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
    return queryInterface.dropTable('books_authors');
  }
};
