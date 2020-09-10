const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const UserDetails = require('../models/users.model');

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) return res.redirect('/signin');

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({
                message: "user logged in",
                isLoggedIn: true,
                user: user.username,
                isAdmin: user.isAdmin});
        });
    })(req, res, next);
});

module.exports = router;