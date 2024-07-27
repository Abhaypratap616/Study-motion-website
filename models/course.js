const mongoose = require('mongoose');   

const courseSchema = new mongoose.Schema({
    coursename:{
        type: String,
        required: true,
        trim : true
    },
    description:{
        type: String,
        required: true,
        trim : true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        trim : true
    },
    whatabout:{
        type: String,
        required: true,
        trim : true
    },
    coursecontent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true,
        trim : true
    },
    ratingview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        required: true,
    },
    price:{
        type: Number,
        required: true,
        trim : true
    },
    thumbnail:{
        type: String,
        required: true,
        trim : true
    },
    tag:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
    },
    studentenrolled:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Course', courseSchema);