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
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const UserDetails = require('./models/users.model');
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy; 

const expressSession = require('express-session')({
    secret: '3COzsSaiAz1sGLYp7v5UEwezaneV9wPE',
    resave: false,
    saveUninitialized: false
})

const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
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
    app.use('/register', register);

    app.listen(PORT, function () {
        console.log("Server is running on Port: " + PORT);
    });
});

passport.use(new LocalStrategy(UserDetails.authenticate()));
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());