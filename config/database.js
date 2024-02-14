const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('QuizApp', 'root', 'tItok321', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;