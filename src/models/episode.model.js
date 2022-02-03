const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    time: {
        type: Number,
        required: true,
        unique: false
    },
    image: {
        type: String,
        required: true,
        unique: false
    },
    video: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    created_at: { 
        type: Date,
        required: true, 
        default: Date.now 
    },
    serie: {
        type: Schema.Types.ObjectId,
        ref: 'Serie'
    },
    season: {
        type: Schema.Types.ObjectId,
        ref: 'Season'
    }
})

module.exports = mongoose.model('Episode', episodeSchema);