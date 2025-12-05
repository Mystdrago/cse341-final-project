const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const db = mongodb.getDatabase().db();
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const db = mongodb.getDatabase().db();
        let user = await db.collection('users').findOne({ googleId: profile.id });
        if (!user) {
            const result = await db.collection('users').insertOne({
                userName: profile.displayName,
                googleId: profile.id,
                gm: 'n'
            });
            user = { _id: result.insertedId, userName: profile.displayName, gm: 'n' };
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));
