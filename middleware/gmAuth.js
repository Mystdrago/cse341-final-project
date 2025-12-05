const { activeTokens } = require('../controllers/login');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || !activeTokens.has(token)) {
        return res.status(401).json({ error: 'Unauthorized: GM token required' });
    }

    next();
};