const router=require('express').Router();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

const Course= require('../models/course');

const {requireLogin}= require('../middleware/auth')

// Get All Course
router.get('/all-course',  async(req, res)=>{
    try{
        let course =await Course.find();
        if(!course){
            return res.status(400).json({error:"No course found!"});
        }
        return res.status(200).json({message:"success", data:course});
    } catch(err) {
         console.log(err.message);
        }
})

// Get Course by Id
router.get('/:id',  async(req, res)=>{
    try{
        let id=req.params.id
        let course =await Course.findById(id);
        if(!course){
            return res.status(400).json({error:"No course found!"});
        }
        return res.status(200).json({message:"success", data:course});
    } catch(err) {
         console.log(err.message);
        }
})

//Add Course
router.post('/add-course',  async(req, res)=>{
    const {course_name, course_title, description, overview, images, price, discount, selling_price }=req.body;
    console.log(req.body )
    try{
        let course =await Course.findOne({course_name});
        if(course){
            return res.status(400).json({error:"Course already exists with this name!"});
        }
        course=new Course({
            course_name, course_title, description, overview, images, price, discount, selling_price 
        })
        const courseSaved= await course.save();
        courseSaved && res && console.log(courseSaved)
        return res.status(201).json({message:"Course created successfully!", data:courseSaved});
    } catch(err) {
         console.log(err.message);
        }
})

// Login Course
// router.post('/login', async (req, res)=>{
//     const {email, password}= req.body;
//     try{
//         let course=await Course.findOne({email});
//         if(!course){
//             return res.status(400).json({error: "Invalid credentials!"});
//         }     
//         const isMatch=await bcrypt.compare(password, course.password);
//         if(!isMatch){
//             return res.status(400).json({error:"Invalid password!"})
//         }
//         const token=jwt.sign({_id:course._id}, process.env.JWT_SECRET,{
//             expiresIn:"1h",
//         });
//         return res.json({token});

//     } catch (err){
//         console.log(err.message);
//     }
// });

//
router.get('/', requireLogin, async (req, res)=>{
    console.log(req.course)
    try {
        const course= await Course.findById(req.course._id).select("-password");
        res.json({course});
    } catch (err){
        console.log(err);
    }
});


module.exports=router