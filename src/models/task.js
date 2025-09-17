const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Project = require('./project');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending'
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Task.belongsTo(Project, { foreignKey: 'projectId' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });
Task.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

module.exports = Task;
