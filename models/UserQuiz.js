const Sequelize = require('sequelize');

module.exports = class UserQuiz extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      total_score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      quiz_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'UserQuiz',
      tableName: 'user_quizzes',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.UserQuiz.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.UserQuiz.belongsTo(db.Quiz, { foreignKey: 'quiz_id', targetKey: 'id' });
    db.UserQuiz.hasMany(db.UserQuest, { foreignKey: 'user_quiz_id' });
  }
};
