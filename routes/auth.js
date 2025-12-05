const router = require('express').Router();
const passport = require('passport');

// Start Google OAuth login
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] })
);

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.json({ message: 'Logged in successfully', user: req.user });
    }
);

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out' });
    });
});

module.exports = router;
