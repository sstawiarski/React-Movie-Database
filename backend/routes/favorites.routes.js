const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = mongoose.connection;

router.get('/:username/all', async (req, res, err) => {
    const username = req.params.username;

    try {
        let firstPost = {};
        const posts = connection.collection('profiles').find({ "username": username });
        if (await posts.hasNext()) {
            const working = await posts.next();
            firstPost.favorites = working.favorites;
            firstPost.foundFavorites = true;
        }

        res.status(200).json(firstPost);
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving favorites" });
    }
});

router.get('/:username/:id', async (req, res, err) => {
    const id = req.params.id;
    const username = req.params.username;

    try {
        const favorite = connection.collection('profiles').find(
            {
                "username": username,
                "favorites": {
                    "$elemMatch": {
                        "imdb": id
                    }
                }
            });

        if (await favorite.hasNext()) {
            res.status(200).json({ message: "Movie is in favorites", isInFavorites: true });
        } else {
            res.status(200).json({ message: "Movie is NOT in favorites", isInFavorites: false });
        }
    }
    catch (err) {
        res.status(401).json({ message: "Error with favorites query", });
    }
})

router.post('/:id', async (req, res, err) => {
    const id = req.params.id;
    const user = req.user;
    const username = req.body.username;

    console.log(user);

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

        await connection.collection('profiles').updateOne({ "username": username }, { $push: { "favorites": movie } })

        res.status(200).json({ message: "Added movie to favorites" });
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving favorites" });
    }
})

router.delete('/:id', async (req, res, err) => {
    const id = req.params.id;
    const username = req.body.username;

    try {

        await connection.collection('profiles').updateOne({ "username": username }, { $pull: { "favorites": { "imdb": id } } })

        res.status(200).json({ message: "Remove movie from favorites" });
    }
    catch (err) {
        res.status(401).json({ message: "Error with favorites" });
    }
})

module.exports = router;