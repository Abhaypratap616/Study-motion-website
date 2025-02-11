const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type: String,
        required: true,
        trim : true
    },
    dateOfBirth:{
        type: Date,
        required: true,
        trim : true
    },
    contactNumber:{
        type: String,
        required: true,
        trim : true
    },
    about:{
        type: String,
        required: true,
        trim : true
    },
});

module.exports = mongoose.model('Profile', profileSchema);