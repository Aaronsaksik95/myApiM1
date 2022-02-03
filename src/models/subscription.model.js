const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    dateSub: {
        type: Date,
        required: true,
        unique: false
    },
    dateUnsub: {
        type: Date,
        required: false,
        unique: false
    },
    idStripeSub: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Subscription', subscriptionSchema);