const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
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
    episode: [{
        type: Schema.Types.ObjectId,
        ref: 'Episode'
    }]
})

module.exports = mongoose.model('Season', seasonSchema);