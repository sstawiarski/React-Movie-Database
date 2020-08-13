const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Posting = new Schema({
    date: {
            type: Date,
            required: true
    },
    content: {
        type: String,
        required: false
    },
    previous: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    before: {
        type: mongoose.Types.ObjectId,
        required: false
    }
});

exports.Posting = mongoose.model('Posting', Posting);