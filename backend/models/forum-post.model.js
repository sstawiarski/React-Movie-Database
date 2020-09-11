const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ForumPost = new Schema({
    dateCreated: {type: Date, required: true, unique: false},
    postContent: {type: String, required: true, unique: false},
    postCreator: {type: String, required: true, unique: false},
    dateUpdated: {type: Date, required: false, unique: false},
    editedBy: {type: String, required: false, unique: false}
});

module.exports = ForumPost;