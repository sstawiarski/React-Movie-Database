const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const { checkIsAdmin } = require('../auth/utils');

router.get('/', async (req, res, err) => {

    try {
        let response = [];
        const allmovies = connection.collection('allmovies').find().sort({ title: 1 });

        while (await allmovies.hasNext()) {
            const curMovie = await allmovies.next();
            response.push(curMovie);
        }

        res.status(200).json(response);
    }
    catch {
        res.status(401).send({ message: "Failed to get all movies from database" });
    }

});

router.get('/:title', async (req, res, err) => {
    let title = decodeURI(req.params.title);

    try {
        let response = [];
        const search = connection.collection('allmovies').aggregate([
            {
                $match: {
                    title: {
                        $regex: `${title}`,
                        $options: "ig"
                    }
                }
            },
            {
                $limit: 5
            }
        ]);

        while (await search.hasNext()) {
            const curMovie = await search.next();
            response.push(curMovie);
        }

        res.status(200).json(response);
    }
    catch {
        res.status(401).send({ message: "Failed to search movies from database" });
    }

});

router.post('/', checkIsAdmin, async (req, res, err) => {
    let newMovie = req.body;
    console.log("Added: "+ newMovie);

    try {
        connection.collection('allmovies').insertOne(newMovie);
        res.status(200).send({message: "Successfully added new movie", success: true});
    }
    catch {
        console.log(err);
        res.status(401).send({message: "Cannot add new movie", success: false});
    }
    
});

module.exports = router;