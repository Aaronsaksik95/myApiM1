const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Movie', movieSchema);