const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      grade: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.UserQuiz, { foreignKey: 'user_id' });
    db.User.hasMany(db.UserScore, { foreignKey: 'user_id' });
    db.User.hasMany(db.Quiz, { foreignKey: 'writer_id' });
  }
};