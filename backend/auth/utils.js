const passport = require('passport');
const UserDetails = require('../models/users.model');
const connectEnsureLogin = require('connect-ensure-login');

const checkIsAdmin = (req, res, next) => {
    connectEnsureLogin.ensureLoggedIn({redirectTo: '/signin'});
    if (!req.user) return res.redirect('/signin')
    if (!req.user.isAdmin) {
        return res.redirect('/');
    }
    return next();
}

const checkAuthentication = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }

    return next();
}

module.exports = { checkIsAdmin, checkAuthentication };