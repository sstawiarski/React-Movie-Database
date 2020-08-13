const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const Posting = require('./posting.model');
const FeaturedMovie = require('./featuredMovie.model').FeaturedMovie;
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to database');
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

//gets newest post in the database
app.get("/postings", async (req, res, err) => {
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

app.get("/postings/:id", async (req, res, err) => {
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

app.get("/seed", async (req, res, err) => {

    try {
        mongoose.connection.db.dropCollection('postings', function (err, result) {
            if (res) {
                console.log("Dropped DB before seed");
            }
        });
        let ids = [];
        let post1 = new Posting.Posting(
            {
                date: new Date(),
                content: "Here are some updates!!",
                previous: null,
                before: null
            }
        );
        ids.push(post1._id);
        await post1.save();

        let post2 = new Posting.Posting(
            {
                date: new Date(),
                content: "Newer post",
                previous: ids[0],
                before: null
            }
        );
        ids.push(post2._id);
        await post2.save();

        let post3 = new Posting.Posting(
            {
                date: new Date(),
                content: "Newest post",
                previous: ids[1],
                before: null
            }
        );

        ids.push(post3._id);
        await post3.save();

        for (let i = 0; i < ids.length - 1; i++) {
            await connection.collection('postings').updateOne({ "_id": ids[i] }, { $set: { before: ids[i + 1] } });
        }

        res.status(200).json({ message: 'Successfully seeded posts' });

    } catch (err) {
        res.status(401).send('Failed to add new post');
        console.log(err);
    }
});

app.get("/featuredMovie", async (req, res, err) => {
    try {
        let featuredMovie = {};
        const movie = connection.collection('featuredmovie').find({}, { sort: { $natural: -1 } });
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

})

app.post("/featuredMovie", (req, res, err) => {
    let newMovie = req.body;
    console.log("Added: "+ newMovie);
    try {
        connection.collection('featuredmovie').insertOne(newMovie);
        res.status(200).send({message: "Successfully added new movie", success: true});
    }
    catch {
        console.log(err);
        res.status(401).send({message: "Cannot add new movie", success: false});
    }

})

app.post("/postings", async (req, res, err) => {
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

});

app.get("/movielist", async (req, res) => {
    try {
        let response = [];
        const allmovies = connection.collection('allmovies').find().sort({title: 1});

        while (await allmovies.hasNext()) {
            const curMovie = await allmovies.next();
            response.push(curMovie);
        }

        res.status(200).json(response);
    }
    catch {
        res.status(401).send({message: "Failed to get all movies from database"});
    }
});

app.get("/movielist/:title", async (req, res) => {
    let title = decodeURI(req.params.title);
    try {
        let response = [];
        const search = connection.collection('allmovies').aggregate([
            {
                $search: {
                    "text": {
                        "query": title,
                        "path": "title"
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
        res.status(401).send({message: "Failed to get all movies from database"});
    }
});