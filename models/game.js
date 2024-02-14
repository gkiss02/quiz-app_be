const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Game = sequelize.define("Games", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    difficulty: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

exports.Game = Game;