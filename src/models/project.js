const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT
});

// Project belongs to one User (Owner)
Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

module.exports = Project;
