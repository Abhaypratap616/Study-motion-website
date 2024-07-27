const mongoose = require('mongoose');

const courseprogress = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        trim : true
    },
    videocompleted:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subsection',
        required: true,
        trim : true
    },

});

module.exports = mongoose.model('Coursepro', courseprogress);