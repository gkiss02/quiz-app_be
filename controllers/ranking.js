const Sequelize = require('sequelize');
const User = require('../models/user');
const Game = require('../models/game').Game;

exports.allTime = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username', [Sequelize.fn('SUM', Sequelize.col('Games.score')), 'totalScore']],
            include: {
                model: Game,
                attributes: [],
                required: true,
            },
            group: ['Users.username'],
            order: [[Sequelize.fn('SUM', Sequelize.col('Games.score')), 'DESC']],
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.weekly = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username', [Sequelize.fn('SUM', Sequelize.col('Games.score')), 'totalScore']],
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

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.monthly = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username', [Sequelize.fn('SUM', Sequelize.col('Games.score')), 'totalScore']],
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

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}