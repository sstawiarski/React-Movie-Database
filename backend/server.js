const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const postings = require('./routes/posts.routes');
const movielist = require('./routes/movies-list.routes');
const featuredMovie = require('./routes/featured-movie.routes');
const moviedetails = require('./routes/movie-details.routes');
const userProfile = require('./routes/user-profile.routes')

const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    app.use('/postings', postings);
    app.use('/movielist', movielist);
    app.use('/featuredMovie', featuredMovie);
    app.use('/moviedetails', moviedetails);
    app.use('/profile', userProfile);

    app.listen(PORT, function () {
        console.log("Server is running on Port: " + PORT);
    });
});