const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserDetail = new Schema({
    username: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique: true},
    creationDate: {type: Date, required: true, unique: false},
    isAdmin: {type: Boolean, required: false, unique: false},
});

UserDetail.plugin(passportLocalMongoose, {
    usernameField: "username"
});

const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

module.exports = UserDetails;