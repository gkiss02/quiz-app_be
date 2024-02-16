const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Game = sequelize.define("Games", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

exports.Game = Game;