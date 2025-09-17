const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Project = require('./project');

const ProjectMember = sequelize.define('ProjectMember', {
  role: {
    type: DataTypes.STRING,
    defaultValue: 'member'
  }
});

User.belongsToMany(Project, { through: ProjectMember, foreignKey: 'userId' });
Project.belongsToMany(User, { through: ProjectMember, foreignKey: 'projectId' });

module.exports = ProjectMember;
