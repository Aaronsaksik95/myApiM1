const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serieSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    like: {
        type: Number,
        required: false,
        unique: false
    },
    actor: [{
        type: String,
        required: true,
        unique: false
    }],
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    season: [{
        type: Schema.Types.ObjectId,
        ref: 'Season'
    }]
})

module.exports = mongoose.model('Serie', serieSchema);