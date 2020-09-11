const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const connection = mongoose.connection;
const { checkIsAdmin } = require('../auth/utils');
const ProfileDetails = require('../models/profile.model');

router.get('/', checkIsAdmin, async (req, res, err) => {
    try {
        let firstPost = {};
        const posts = connection.collection('profiles').find({}, { sort: { $natural: -1 } });
        if (await posts.hasNext()) {
            const working = await posts.next();
            firstPost.username = working.username;
            firstPost.email = working.email;
            firstPost.age = working.age;
            firstPost.location = working.location;
            firstPost.profileText = working.profileText;
            firstPost.favorites = working.favorites;
            firstPost.profilePicture = working.profilePicture;
        }

        res.status(200).json(firstPost);
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving first profile" });
    }
});

router.get('/:id', async (req, res, err) => {
    const id = req.params.id;

    try {
        let firstPost = {};
        const posts = connection.collection('profiles').find({ "username": id });
        if (await posts.hasNext()) {
            const working = await posts.next();
            firstPost.username = working.username;
            firstPost.email = working.email;
            firstPost.age = working.age;
            firstPost.location = working.location;
            firstPost.profileText = working.profileText;
            firstPost.profilePicture = working.profilePicture;
            firstPost.favorites = working.favorites.reverse().slice(0, 5);
            firstPost.favoriteCount = working.favorites.length;
        }

        res.status(200).json(firstPost);
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving profile" });
    }
});

router.put('/:id', async (req, res, err) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    try {
        await ProfileDetails.updateOne({ username: id }, { 
                age: req.body.hasOwnProperty("age") ? req.body.age : null,
                location: req.body.hasOwnProperty("location") ? req.body.location : "",
                profileText: req.body.hasOwnProperty("profileText") ? req.body.profileText : "",
                profilePicture: req.body.hasOwnProperty("profilePicture") ? req.body.profilePicture : "",
         });
        res.status(200).json({ message: "Successfully updated resource" })
    }
    catch (error) {
        res.status(500).json({ message: "Error updating profile" })
    }
})

module.exports = router;