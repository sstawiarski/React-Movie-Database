const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const UserDetails = require('../models/users.model');

router.get('/', (req, res) => {
    req.logOut();
    res.redirect("/")
});

module.exports = router;