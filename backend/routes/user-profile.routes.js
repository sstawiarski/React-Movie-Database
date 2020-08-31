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

router.get('/favorites/:id', async (req, res, err) => {
    const id = req.params.id;
    const email = req.body.email;

    try {
        const favorite = connection.collection('profiles').find(
            { 
                "email": email,
                "favorites": {
                    "$elemMatch": {
                        "imdb": id
                    }
                }
         });

         if (await favorite.hasNext()) {
            res.status(200).json({message: "Movie is in favorites", isInFavorites: true});
         } else {
            res.status(200).json({message: "Movie is NOT in favorites", isInFavorites: false});
         }
    }
    catch (err) {
        res.status(401).json({ message: "Error with favorites query",});
    }
})

router.post('/favorites/:id', async (req, res, err) => {
    const id = req.params.id;
    const email = req.body.email;

    try {
        let movie = {};
        const posts = connection.collection('allmovies').find({ "imdb": id });
        if (await posts.hasNext()) {
            const working = await posts.next();
            movie.title = working.title;
            movie.poster = working.poster;
            movie.year = working.year;
            movie.imdb = working.imdb;
        }

        await connection.collection('profiles').updateOne({"email": email}, {$push: {"favorites": movie} } )

        res.status(200).json({message: "Added movie to favorites"});
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving favorites" });
    }
})

module.exports = router;