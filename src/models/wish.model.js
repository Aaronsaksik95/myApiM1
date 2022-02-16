const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    series: [{
        type: Schema.Types.ObjectId,
        ref: 'Serie'
    }]
})

module.exports = mongoose.model('Wish', WishSchema);