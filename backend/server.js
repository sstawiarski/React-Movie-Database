const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const Posting = require('./posting.model');
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
        mongoose.connection.db.dropCollection('foo', function(err, result) {
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

        for (let i = 0; i < ids.length-1; i++) {
            await connection.collection('postings').updateOne({"_id" : ids[i]}, {$set: { before: ids[i+1] } });
        }

        res.status(200).json({ message: 'Successfully seeded posts' });

    } catch(err) {
        res.status(401).send('Failed to add new post');
        console.log(err);
    }
});