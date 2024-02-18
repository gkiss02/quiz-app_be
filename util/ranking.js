const User = require('../models/user');
const Game = require('../models/game').Game;
const Sequelize = require('sequelize');

exports.getAllUsers = async () => {
    const users = await User.findAll({
        attributes: [ 'id', 'username', [Sequelize.fn('SUM', Sequelize.col('Games.score')), 'totalScore']],
        include: {
            model: Game,
            attributes: [],
            required: true,
        },
        group: ['Users.username'],
        order: [[Sequelize.fn('SUM', Sequelize.col('Games.score')), 'DESC']],
    });
    return users;
}

exports.getMonthlyUsers = async () => {
    const users = await User.findAll({
        attributes: [ 'id', 'username', [Sequelize.fn('SUM', Sequelize.col('Games.score')), 'totalScore']],
        include: {
            model: Game,
            attributes: [],
            required: true,
            where: {
                createdAt: {
                    [Sequelize.Op.gte]: new Date(new Date() - 30 * 60 * 60 * 24 * 1000),
                },
            },
        },
        group: ['Users.username'],
        order: [[Sequelize.fn('SUM', Sequelize.col('Games.score')), 'DESC']],
    });
    return users;
}

exports.getWeeklyUsers = async () => {
    const users = await User.findAll({
        attributes: [ 'id', 'username', [Sequelize.fn('SUM', Sequelize.col('Games.score')), 'totalScore']],
        include: {
            model: Game,
            attributes: [],
            required: true,
            where: {
                createdAt: {
                    [Sequelize.Op.gte]: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
                },
            },
        },
        group: ['Users.username'],
        order: [[Sequelize.fn('SUM', Sequelize.col('Games.score')), 'DESC']],
    });
    return users;
}