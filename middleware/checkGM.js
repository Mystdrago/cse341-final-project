// middleware/checkGM.js
const checkGM = (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (req.user.gm !== 'y') return res.status(403).json({ error: 'GM only' });
    next();
};

module.exports = checkGM;
