
const User = require('../models/user');
const Otp = require('../models/otp');
const otpgenerator = require('otp-generator');
const profile = require('../models/profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//otp generation
exports.generateOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ message: 'User already exist' });
        }
        const otp1 = otpgenerator.generate(6, { upperCase: false, lowerCase:false, specialChars: false });
        console.log(otp1);
        const otpcheak = await Otp.findOne({otp});
       while(otpcheak===otp1){
           otp1 = otpgenerator.generate(6, { upperCase: false, lowerCase:false, specialChars: false });
       }
       const payload = {
           email,
           otp: otp1
       };
       const otpenter = await Otp.create(payload);
       console.log(otpenter);
         res.status(200).json({ message: 'OTP send successfully (saved in db)' }); 
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}
// sign up
exports.sigup = async (req, res) => {
   //data fetch karna hai 
   try{
   const {firstname,lastname,email,password,confirmpassword,accounttype,contactNumber,otp} = req.body;
   // validation
   if(!firstname || !lastname || !email || !password || !confirmpassword || !accounttype || !contactNumber || !otp){
    return res.status(400).json({message: 'All fields are required'});
}
   //password match 
    if(password !== confirmpassword){
        return res.status(400).json({message: 'Password do not match'});
    }
   // cheak user already exist or not
   const mailcheaker = await User.findOne({email});
   console.log(mailcheaker);
    if(mailcheaker){
        return res.status(400).json({message: 'User already exist'});
    }
   // otp cheak
    const otpcheak = await Otp.findOne({otp});
    console.log(otpcheak);
    if(otpcheak.otp !== otp){
        return res.status(400).json({message: 'Invalid OTP'});
    }
    //password hashing
    const hashpassword = await bcrypt.hash(password, 10);
    // save data in db
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashpassword,
         accounttype,
        contactNumber,
        additionalInfo: profile._id,
        img:  `https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastName}`,
        courseprogress: courseprogress._id
    });
    console.log(user);
    res.status(200).json({message: 'User register successfully'});
}
catch(error){
    console.error(error.message);
    res.status(500).json({message: 'Server Error'});
}
}
// login
exports.login = async (req, res) => {
 try{
    //data fetch karna hai
    const {email, password} = req.body;
     //validation
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }
    //user exist or not
    const user = await User.findOne({email}).populate('additionalInfo');
    if(!user){
        return res.status(400).json({message: 'Invalid credentials'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: 'wrong password'});
    }
    const payload ={
        email: user.email,
        role: user.accounttype, 
        id : user._id
    }
    user.token = user;  //vhfgfgffyfyfgfgggggggggggggggggggggggggggggggggggggggggggggggggg
    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '2h'});
    const cookieOptions = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('token', token, cookieOptions).status(200).json({message: 'User login successfully', token, user,});
 }
    catch(error){
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }

}

