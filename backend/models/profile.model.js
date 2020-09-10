const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Profile = new Schema({
    username: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique: true},
    age: {type: String, required: false, unique: false},
    location: {type: String, required: false, unique: false},
    profileText: {type: String, required: false, unique: false},
    profilePicture: {type: String, required: false, unique: false},
    favorites: {type: Array, required: false, unique: false},
});

const ProfileDetails = mongoose.model('profiles', Profile, 'profiles');

module.exports = ProfileDetails;