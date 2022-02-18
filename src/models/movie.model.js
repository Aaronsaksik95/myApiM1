const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
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
    year: {
        type: Number,
        required: true,
        unique: false
    },
    superSub: {
        type: Boolean,
        required: true,
        default: false
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
    }]
})

module.exports = mongoose.model('Movie', movieSchema);