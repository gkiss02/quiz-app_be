const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).json("User created successfully!")
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ where: {email: email} });
        if (!user) {
            return res.status(401).json("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json("Invalid email or password");
        }

        const token = jwt.sign(
            {
                email: user.email, 
                userId: user.id.toString()
            },
                'creinuf_548?uzsvde',
            {
                expiresIn: '1h'
            }
        );
        res.status(200).json({ token: token });
    } catch (err) {
        res.status(400).json(err);
    }
}