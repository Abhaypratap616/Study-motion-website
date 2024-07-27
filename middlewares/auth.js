    //auth token check

    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    const User = require('../models/user');

    const auth = async (req, res, next) => {
        try{
            const token = req.cookies.token||req.body.token||req.header('authorization');
            if(!token){
                return res.status(401).json({message: 'No token, authorization denied'});
            }
try{
    
       const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified);
        req.user = verified
}
       catch(error){
       console.error(error.message);
       res.status(401).json({message: 'No token, authorization denied'});

}
next();
        }
        catch(error){
            console.error(error.message);
            res.status(401).json({message: 'No token, authorization denied'});
        }
    }
    //is student
    exports.isstudent = async(req,res,next)=>{
        try{
            if(req.user.role === 'student'){
              res.status(200).json({message: 'Welcome student'});
            }
            next();
        }
        catch(error){
            console.error(error.message);
            res.status(401).json({message: 'No token, authorization denied'});
        }
    }

    //is instructor
    exports.isstudent = async(req,res,next)=>{
        try{
            if(req.user.role === 'admin'){
              res.status(200).json({message: 'Welcome student'});
            }
            next();
        }
        catch(error){
            console.error(error.message);
            res.status(401).json({message: 'No token, authorization denied'});
        }
    }
    //is admin
    exports.isstudent = async(req,res,next)=>{
        try{
            if(req.user.role ==='instructor'){
              res.status(200).json({message: 'Welcome student'});
            }
            next();
        }
        catch(error){
            console.error(error.message);
            res.status(401).json({message: 'No token, authorization denied'});
        }
    }

