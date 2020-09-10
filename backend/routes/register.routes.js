const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const UserDetails = require('../models/users.model');
const ProfileDetails = require('../models/profile.model');

router.post('/', async (req, res, next) => {
    try {
        if (await UserDetails.findByUsername(req.body.username)) {
            res.send({message: "User already exists", registerSuccess: false})
        }
        else {
            console.log(req.body)
            await UserDetails.register(
                {
                    username: req.body.username,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin,
                    creationDate: new Date()
                },
                req.body.password
            );
            await ProfileDetails.create({
                username: req.body.username,
                email: req.body.email,
                age: null,
                location: "",
                profileText: "",
                profilePicture: "",
                favorites: []
            });

            res.send({message: "User registered", registerSuccess: true})
        }
    } catch (err) {
        next(err);
    }
  
});

module.exports = router;