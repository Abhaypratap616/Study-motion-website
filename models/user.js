const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim : true
    },
    lastName:{
        type: String,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
       type : String,
         required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin', "instructor"],
        default: 'user'
    },
    additionalInfo:{
       type: mongoose.Schema.Types.ObjectId,
         ref: 'profile',
         required: true
    },
    contactNumber:{
        type: Number,
        required: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
     img:{
        type: String,
        required: true
     },

     token:{
        type: String,
        required: true
     },
     
     resetPasswordExpire:{
        type: Date,
        required: true
     },
     courseprogress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseprogress',
        required: true
     },
});

module.exports = mongoose.model('User', userSchema);


