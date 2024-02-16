const express = require('express');
const Game = require('../models/game');
const User = require('../models/user');

exports.createGame = async (req, res) => {
    const difficulty = req.params.difficulty;
    const userId = res.userId;

    try {
        const user = await User.findOne({ where: { id: userId } });

        const game = await user.createGame({
            score: 0,
            difficulty: difficulty
        });

        await game.save();
        res.status(201).json("Game created successfully!");
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.increaseScore = async (req, res) => {
    const userId = res.userId;

    try {
        const user = await User.findOne({ where: { id: userId } });
        const games = await user.getGames();
        const game = games[games.length - 1];

        game.update({ score: game.score + 1 * game.difficulty});

        await user.save()
        res.status(200).json("Score increased successfully!");
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};