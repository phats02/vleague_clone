const passport = require('passport')
const db = require("../models/db.js")
var JwtStrategy = require('passport-jwt').Strategy
var cookieParser = require('cookie-parser')
var opts = require('./opts')

module.exports = app => {
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('session'));
    app.use(cookieParser())

    passport.serializeUser(function (user, done) {
        done(null, user.username)
    });

    passport.deserializeUser(async function (username, done) {
        try {
            const user = await db.getOne("users", "username", username)
            done(null, user.username);
        }
        catch (err) {
            done(err, null)
        }
    });
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await db.getOne("users", "username", jwt_payload.user)
            if (user) return done(null, user);
            else done(null, false)

        }
        catch (err) {
            return done(err, false)
        }
    }));
}