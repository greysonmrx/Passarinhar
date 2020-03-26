'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('loans', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: Sequelize.DATE
      },
      real_return_date: {
        type: Sequelize.DATE
      },
      return_date: {
        type: Sequelize.DATE
      },
      delivery_date: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
        allowNull: true
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: { model: 'books', key: 'id' },
        onDelete: 'SET NULL',
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'accepted'
      },
      canceled_at: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('loans');
  }
};
