const mongoose = require('mongoose');
const mailsender = require('../utils/mailsender');
const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim : true
    },
    otp:{
        type: String,
        required: true,
        trim : true
    },
    created:{
        type: Date,
        default: Date.now,
        expires: 600
    }
});

async function createOtp(email, otp){
   try{
const abhayopt = await mailsender(email,"OTP for password reset",`Your OTP is ${otp}`);
console.log(abhayopt);
   }
    catch(err){
         console.log(err);
    }
}

otpSchema.pre('save', async function(next){
    await createOtp(this.email, this.otp);
});

module.exports = mongoose.model('Otp', otpSchema);