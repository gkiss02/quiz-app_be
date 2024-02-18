const helper = require('../util/ranking');

exports.allTime = async (req, res) => {
    try {
        const users = await helper.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.monthly = async (req, res) => {
    try {
        const users = await helper.getMonthlyUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.weekly = async (req, res) => {
    try {
        const users = await helper.getWeeklyUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.myRanking = async (req, res) => {
    const userId = res.userId;
    try {
        const users = await helper.getAllUsers();
        const index = users.findIndex(user => user.id == userId);

        const rank =  {
            stead: index + 1,
            totalScore: users[index].dataValues.totalScore
        }

        res.status(200).json(rank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 