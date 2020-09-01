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
const signIn = require('./routes/login.routes');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const expressSession = require('express-session')({
    secret: '3COzsSaiAz1sGLYp7v5UEwezaneV9wPE',
    resave: false,
    saveUninitialized: false
})

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

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
    app.use('/signin', signIn);

    app.listen(PORT, function () {
        console.log("Server is running on Port: " + PORT);
    });
});

const UserDetail = new Schema({
    username: String,
    password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());