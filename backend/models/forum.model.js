const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ForumThread = require('./forum-thread.model');

const Forum = new Schema({
    name: {type: String, required: true, unique:true},
    id: {type: Number, required: true, unique: true},
    threads: [ForumThread]
});

const ForumDetails = mongoose.model('forums', Forum, 'forums');

module.exports = ForumDetails;