'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
          type: Sequelize.STRING,
          allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      complement: {
        type: Sequelize.STRING
      },
      public_place: {
        type: Sequelize.STRING,
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    return queryInterface.dropTable('users');
  }
};
