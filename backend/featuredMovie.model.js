const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FeaturedMovie = new Schema({
    imdb: {
            type: String,
            required: true,
            unique: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: false
    },
    poster: {
        type: String,
        required: true
    }
});

exports.FeaturedMovie = mongoose.model('FeaturedMovie', FeaturedMovie);