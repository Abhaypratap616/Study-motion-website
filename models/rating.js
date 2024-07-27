const mongoose = require('mongoose');
const user = require('./user');

const ratingSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Rating', ratingSchema);