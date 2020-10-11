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
const register = require('./routes/register.routes');
const favorites = require('./routes/favorites.routes');
const forums = require('./routes/forums.routes');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const UserDetails = require('./models/users.model');
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy; 
const cookieSession = require('cookie-session')

const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieSession({
    name: 'MovieDB',
    keys: ['3COzsSaiAz1sGLYp7v5UEwezaneV9wPE'],
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://ser401:Ser401Team24@cluster0.cjcoh.mongodb.net/moviedb?retryWrites=true&w=majority", {
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
    app.use('/register', register);
    app.use('/favorites', favorites);
    app.use('/forums', forums);
    
    app.listen(PORT, function () {
        console.log("Server is running on Port: " + PORT);
    });
});

passport.use(new LocalStrategy(UserDetails.authenticate()));
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

