const mongoose = require('mongoose');

const mailsender = async(email,title,otp)=>{
    try{
let transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    
    }
});
let info = await transporter.sendMail({
    from:process.env.MAIL_USER,
    to:`${email}`,
    subject:`${title}`,
    text:`${otp}`
});
console.log('Message sent: %s', info.messageId);
    }
    catch(error){
        console.error(error.message);
    }
}