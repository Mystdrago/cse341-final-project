const mongodb = require('../data/database');

// Simple token generator
function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

const activeTokens = new Set();

const login = async (req, res) => {
    //#swagger.tags=['login']
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ error: 'Missing login credentials' });
    }

    try {
        const db = mongodb.getDatabase().db();
        const user = await db.collection('users').findOne({ userName, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check GM permission
        if (user.gm !== 'y') {
            return res.status(403).json({ error: 'User is not a GM' });
        }

        // Generate a token and store it
        const token = generateToken();
        activeTokens.add(token);

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Export token list so middleware can check it
module.exports = { login, activeTokens };