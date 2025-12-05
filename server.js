const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongodb = require('./data/database');

require('./auth/passport'); // Google OAuth strategy

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Express session required for Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// OAuth routes
app.use('/auth', require('./routes/auth'));

// Swagger route
app.use('/api-docs', require('./routes/swagger'));

// API routes
app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening, and Node is running on port ${port}`);
        });
    }
});

module.exports = app; // export for testing
