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

exports.updateEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
        const user = await User.findOne({ where: { id: res.userId } });
        const existingEmail = await User.findOne({ where: { email: email } });

        if (existingEmail && existingEmail.id != res.userId) {
            res.status(400).json("Email already exists");
        }
        
        user.set({
            email: email
        });

        await user.save();
        res.status(201).json("Email updated");
    } catch {
        res.status(401).json("Update fail");
    }
}

exports.updatePassword = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        const user = await User.findOne({ where: { id: res.userId } });
        user.set({
            password: hashedPassword
        });
        await user.save();
        res.status(201).json("Password updated");
    } catch {
        res.status(401).json("Update fail");
    }
}

exports.updateProfilePicture = async (req, res) => {
    const profilePicture = req.body.profilePicture;

    try {
        const user = await User.findOne({ where: { id: res.userId } });
        user.set({
            profilePicture: profilePicture
        });
        await user.save();
        res.status(201).json("Profile picture updated");
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

