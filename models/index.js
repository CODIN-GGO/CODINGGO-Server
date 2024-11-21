const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

const User = require('./User');
const Quiz = require('./Quiz');
const Quest = require('./Quest');
const UserQuiz = require('./UserQuiz');
const UserQuest = require('./UserQuest');
const UserScore = require('./UserScore');

// model 설정
db.User = User.init(sequelize);
db.Quiz = Quiz.init(sequelize);
db.Quest = Quest.init(sequelize);
db.UserQuiz = UserQuiz.init(sequelize);
db.UserQuest = UserQuest.init(sequelize);
db.UserScore = UserScore.init(sequelize);

// 관계 설정
User.associate(db);
Quiz.associate(db);
Quest.associate(db);
UserQuiz.associate(db);
UserQuest.associate(db);
UserScore.associate(db);


module.exports = db;