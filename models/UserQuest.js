const Sequelize = require('sequelize');

module.exports = class UserQuest extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      selected_answer: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_quiz_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      quest_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'UserQuest',
      tableName: 'user_quests',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.UserQuest.belongsTo(db.UserQuiz, { foreignKey: 'user_quiz_id', targetKey: 'id' });
    db.UserQuest.belongsTo(db.Quest, { foreignKey: 'quest_id', targetKey: 'id' });
  }
};
