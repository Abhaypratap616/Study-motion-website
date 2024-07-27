const mongoose  = require('mongoose');
const crypto = require('crypto');
const User = require('../models/user');
const mailsender = require('../utils/otpsender');
exports.resetpassword = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        //generate token
        const tokennormal = crypto.randomUUID();
        const update = await User.findOneAndUpdate({email:email}, {
        token: token,
       
            resetPasswordExpire: Date.now() + 600000
        }, {new: true});
          
        console.log(update);
        //create user 

        const url = `http://localhost:3000/update-password/${tokennormal}`;
        await mailsender(email, 'Password reset', url);
        res.status(200).json({message: 'Email sent'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
};
exports.updatepassword = async (req, res) => {
    try{

        //data fetch karna hai

        const {password, confirmpassword} = req.body;
        const token = req.params.token;
        if(!password || !confirmpassword){
            return res.status(400).json({message: 'All fields are required'});
        }
        //password match
        if(password !== confirmpassword){
            return res.status(400).json({message: 'Password do not match'});
        }
        const userdetails = await User.findOne({token: token});
        if(!userdetails){
            return res.status(400).json({message: 'Invalid token'});
        }
        if(userdetails.resetPasswordExpire < Date.now()){
            return res.status(400).json({message: 'Token expired'});
        }
        //password hashing

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const update = await User.findOneAndUpdate({token: token}, {
            password: hashpassword,
        },
        {new: true},
    )
    }
    catch{

    }
}






