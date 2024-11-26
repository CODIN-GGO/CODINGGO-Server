const Sequelize = require('sequelize');

module.exports = class Quest extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('multiple', 'blank'),
        allowNull: true,
      },
      answer: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      correctAnswer: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null, // 기본값으로 null 설정
      },
      quiz_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Quest',
      tableName: 'quests',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Quest.belongsTo(db.Quiz, { foreignKey: 'quiz_id', targetKey: 'id' });
    db.Quest.hasMany(db.UserQuest, { foreignKey: 'quest_id' });
  }
};
