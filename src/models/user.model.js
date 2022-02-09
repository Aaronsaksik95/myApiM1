const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    isSub: {
        type: Boolean,
        required: true,
        default: false
    },
    superSub: {
        type: Boolean,
        required: true,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
})

module.exports = mongoose.model('User', userSchema);