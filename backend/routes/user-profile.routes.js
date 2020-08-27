const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const connection = mongoose.connection;

router.get('/', async (req, res, err) => {
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
        }

        res.status(200).json(JSON.stringify(firstPost));
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving first profile" });
    }
});

router.get('/:id', async (req, res, err) => {
    const id = req.params.id;

    try {
        let firstPost = {};
        const posts = connection.collection('profiles').find({ "email": id });
        if (await posts.hasNext()) {
            const working = await posts.next();
            firstPost.username = working.username;
            firstPost.email = working.email;
            firstPost.age = working.age;
            firstPost.location = working.location;
            firstPost.profileText = working.profileText;
            firstPost.favorites = working.favorites;
        }

        res.status(200).json(JSON.stringify(firstPost));
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving profile" });
    }
});

module.exports = router;