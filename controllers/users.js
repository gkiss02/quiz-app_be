const User = require('../models/user');

exports.getMe = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: res.userId } });
        return res.status(200).json(user);
    } catch {
        return res.status(401)
    }
}
