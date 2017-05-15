import Sequelize from 'sequelize';

export default function (sequelize) {
  const user = sequelize.define('user', {
    weChatID: {
      type: Sequelize.STRING,
      unique: true
    },
    // 学籍号
    studentID: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING
    },
    area: {
      type: Sequelize.STRING,
    },
    // 参赛类型（小学／初中）
    type: {
      type: Sequelize.STRING
    },
    schoolName: {
      type: Sequelize.STRING
    },
    // 1未答题/ 2已答题
    progress: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    objectiveScore: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    subjectiveTitle: {
      type: Sequelize.INTEGER
    },
    subjectiveAnswer: {
      type: Sequelize.STRING
    },
    subjectiveScore: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    sumScore: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    certificateID: {
      type: Sequelize.STRING
    }
  }, {
    paranoid: true,
    underscored: true,
  });
  return user;
}

