const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("feuwegyfhv")

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // set true for debugging
  }
);

module.exports = sequelize;
