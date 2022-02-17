const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    created_at: { 
        type: Date,
        required: true, 
        default: Date.now 
    },
})

module.exports = mongoose.model('Category', CategorySchema);