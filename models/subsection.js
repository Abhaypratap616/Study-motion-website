const mongoose = require('mongoose');

const subsectionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim : true
    },
   timeduration:{
        type: String,
        required: true,
        trim : true
    },
    videourl:{
        type: String,
        required: true,
        trim : true
    },
    desciption:{
        type: String,
        required: true,
        trim : true
    },
    addtionalurl:{
        type: String,
        required: true,
        trim : true
    },
});

module.exports = mongoose.model('Subsection', subsectionSchema);