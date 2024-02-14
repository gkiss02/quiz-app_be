const User = require('../models/user');

exports.usernameExists = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user ? Promise.reject('Username already in use') : Promise.resolve();
};

exports.emailExists = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user ? Promise.reject('Email already in use') : Promise.resolve();
}