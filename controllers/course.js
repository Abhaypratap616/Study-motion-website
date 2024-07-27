const Course = require('../models/course');
const Tag = require('../models/tag');
const User = require('../models/user');
const {upload} = require('../utils/imgupload');
 
//create course

exports.createCourse = async(req,res)=>{
    try{
// fetch data 
const {coursename, description,whatabout,price,tag} = req.body;
//upload image
const thumbnail = await upload(req.file.path);
//validate
if(!coursename || !description || !whatabout || !price || !tag){
    return res.status(400).json({message: 'All fields are required'});
}
//instuctor details

const userid = req.user.id;
const instructor = await User.findById(userid);
console.log(instructor);

if(!instructor){
    return res.status(400).json({message: 'Instructor not found'});

}



    }
    catch(error){
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
}




