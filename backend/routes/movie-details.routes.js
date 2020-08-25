const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const connection = mongoose.connection;

router.get('/:id', async (req, res, err) => {
    const id = req.params.id;

    try {     
        const movie = await connection.collection('allmovies').findOne({"imdb": id});

        if (movie) {
            res.status(200).json(movie);
        }

        else {
            res.status(401).json({message: "Movie not found"});
        }
        
    }
    catch {
        res.status(401).json({ message: "Error retrieving movie" });
        console.log(err);
    }

});

module.exports = router;