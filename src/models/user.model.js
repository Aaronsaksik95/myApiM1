const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastname: {
        type: String,
        required: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60,
        unique: true
    },
    // phone: {
    //     type: String,
    //     required: false,
    // },
    // isAdmin: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    // address: {
    //     type: String,
    //     required: false,
    // },
    // city: {
    //     type: String,
    //     required: false,
    // },
    // postalCode: {
    //     type: Number,
    //     required: false,
    // },
    // country: {
    //     type: String,
    //     required: false,
    // },
})

module.exports = mongoose.model('User', userSchema);