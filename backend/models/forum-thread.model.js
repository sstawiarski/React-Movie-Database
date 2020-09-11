const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ForumPost = require('./forum-post.model')


const ForumThread = new Schema({
    dateCreated: {type: Date, required: true, unique: false},
    threadTitle: {type: String, required: true, unique: false},
    postCreator: {type: String, required: true, unique: false},
    id: {type: Number, required: true, unique: true},
    forumPosts: [ForumPost]
});

module.exports = ForumThread;