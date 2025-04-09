'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'type', {
      type: Sequelize.ENUM('admin', 'basic', 'moderator'),
      allowNull: false,
      defaultValue: 'basic',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'type');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_usuarios_type";',
    );
  },
};
