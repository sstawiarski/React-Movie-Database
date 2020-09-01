const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', (req, res, err) => {
    res.send({message: "sign in page"});
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) return res.redirect('/signin')

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({message: "user logged in", isLoggedIn: true});
        });
    })(req, res, next);
});

module.exports = router;