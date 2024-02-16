const e = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getMe = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: res.userId } });
        res.status(200).json(user);
    } catch {
        res.status(401)
    }
}

exports.updateMe = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.findOne({ where: { id: res.userId } });

        const existingUsername = await User.findOne({ where: { username: username } });
        const existingEmail = await User.findOne({ where: { email: email } });

        if (existingUsername && existingUsername.id != res.userId) {
            res.status(400).json("Username already exists");
        }

        if (existingEmail && existingEmail.id != res.userId) {
            res.status(400).json("Email already exists");
        }

        user.set({
            username: username,
            email: email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json("Changes saved");
    } catch {
        res.status(401).json("Update fail");
    }
}

exports.deleteMe = async (req, res) => {
    try {
        await User.destroy({ where: { id: res.userId } });
        res.status(201).json('User deleted' );
    } catch {
        res.status(401);
    }
}

