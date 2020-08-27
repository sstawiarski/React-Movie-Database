const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Posting = require('../models/posting.model');
const connection = mongoose.connection;

router.get('/', async (req, res, err) => {
    try {
        let firstPost = {};
        const posts = connection.collection('postings').find({}, { sort: { $natural: -1 } });
        if (await posts.hasNext()) {
            const working = await posts.next();
            firstPost.date = working.date;
            firstPost.content = working.content;

            if (await posts.hasNext()) {
                const next = await posts.next();
                firstPost.previous = next._id.toString();
            } else {
                firstPost.previous = "";
            }
        }

        res.status(200).json(JSON.stringify(firstPost));
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving first post" });
    }
});

router.get('/:id', async (req, res, err) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    try {
        let post = {};
        const posts = connection.collection('postings').find({ "_id": id });
        if (await posts.hasNext()) {
            const working = await posts.next();
            post.date = working.date;
            post.content = working.content;

            if (working.previous != null) {
                post.previous = working.previous.toString();
            } else {
                post.previous = "";
            }

            if (working.before != null) {
                post.before = working.before.toString();
            } else {
                post.before = "";
            }
        }

        res.status(200).json(JSON.stringify(post));
    }
    catch (err) {
        res.status(401).json({ message: "Error retreving post" });
    }
});

router.post('/', async (req, res, err) => {
    try {
        const latest = connection.collection('postings').find({}, { sort: { $natural: -1 } });
        let latestId = null;
        let post = null;
        if (await latest.hasNext()) {
            post = await latest.next();
            latestId = post._id;
        }

        let newPost = new Posting.Posting(
            {
                content: req.body.content,
                date: Date.now(),
                previous: latestId,
                before: null
            }
        );
        
        const newestId = newPost._id;

        await newPost.save();

        if (post !== null) {
            await connection.collection('postings').updateOne({ "_id": latestId }, { $set: { before: newestId } });
        }

        res.status(200).send({message: "Successfully added new movie", success: true});
    }
    catch {
        console.log(err);
        res.status(401).send({message: "Cannot add new movie", success: false});
    }
})

module.exports = router;