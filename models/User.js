const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
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
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: null, // 기본값으로 null 설정
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false, // 기본값으로 false 설정
      },
      refreshToken: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null, // 기본값으로 null 설정
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