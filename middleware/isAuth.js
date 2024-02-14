const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'creinuf_548?uzsvde');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    res.userId = decodedToken.userId;
    next();
}
