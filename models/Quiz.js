const Sequelize = require('sequelize');

module.exports = class Quiz extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      quest_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      level: {
        type: Sequelize.ENUM('easy', 'medium', 'hard'),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Quiz',
      tableName: 'quizzes',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Quiz.hasMany(db.Quest, { foreignKey: 'quiz_id', sourceKey: 'id' });
    db.Quiz.hasMany(db.UserQuiz, { foreignKey: 'quiz_id' });
  }
};