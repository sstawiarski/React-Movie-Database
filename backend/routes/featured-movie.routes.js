const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FeaturedMovie = require('../models/featuredMovie.model').FeaturedMovie;

const connection = mongoose.connection;

router.get('/', async (req, res, err) => {

    try {
        let featuredMovie = {};
        
        const movie = connection.collection('featuredmovies').find({}, { sort: { $natural: -1 } });
        if (await movie.hasNext()) {
            const working = await movie.next();
            featuredMovie.title = working.title;
            featuredMovie.imdb = working.imdb;
            featuredMovie.plot = working.plot;
            featuredMovie.poster = working.poster;
            featuredMovie.year = working.year;
        }

        res.status(200).json(featuredMovie);
    }
    catch {
        res.status(401).json({ message: "Error retreving featured movie" });
        console.log(err);
    }

});

router.post('/', async (req, res, err) => {
    let newMovie = req.body;

    const newFeaturedMovie = new FeaturedMovie({
        imdb: newMovie.imdb,
        title: newMovie.title,
        plot: newMovie.plot,
        poster: newMovie.poster,
        year: newMovie.year
    });

    try {
        await FeaturedMovie.collection.drop();
        await newFeaturedMovie.save();
        console.log("Added: " + newMovie.title + " as the featured title");

        res.status(200).send({ message: "Successfully added new movie", success: true });
    }
    catch {
        console.log(err);
        res.status(401).send({ message: "Cannot add new movie", success: false });
    }

});

module.exports = router;