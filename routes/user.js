const router=require('express').Router();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

const User= require('../models/user');

const {requireLogin}= require('../middleware/auth')

//Register User
router.post('/register', async(req, res)=>{
    const {name, email, password, role, roles}=req.body;
    try{
        let user =await User.findOne({email});
        if(user){
            return res.status(400).json({error:"User already exists with this email !"});
        }
        const hashed_password=await bcrypt.hash(password, 10);
        user=new User({
            name,
            email,
            password: hashed_password,
            role,
            roles
        })
        await user.save();
        return res.status(201).json({message:"User created successfully please login using credentials!"});
    } catch(err) {
         console.log(err.message);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})

// Login User
router.post('/login', async (req, res)=>{
    const {email, password}= req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Invalid credentials!"});
        }     
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid password!"})
        }
        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"1h",
        });
        return res.json({token});

    } catch (err){
        // console.log(err.message);
        return res.status(400).json({message:err.message ||"failure", error:err});
    }
});

// Login with User Data
router.post('/login_user', async (req, res)=>{
    const {email, password}= req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Invalid credentials!"});
        }     
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid password!"})
        }
        const userWithoutPassword= await User.findById(user._id).select("-password");
        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"8h",
        });
        return res.json({token, user:userWithoutPassword });
        // return res.json({token, user:{...userWithoutPassword, roles:[0,1,5]} });

    } catch (err){
        // console.log(err.message);
        return res.status(400).json({message:err.message ||"failure", error:err});
    }
});

// Get All User
router.get('/users',  async(req, res)=>{
    try{
        let users =await User.find();
        if(!users){
            return res.status(400).json({error:"No users found!"});
        }
        return res.status(200).json({message:"success", data:users});
    } catch(err) {
         console.log(err.message);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})

//
router.get('/', requireLogin, async (req, res)=>{
    console.log(req)
    try {
        const user= await User.findById(req.user._id).select("-password");
        res.json({user});
    } catch (err){
        // console.log(err);
        return res.status(401).json({message:"Unauthorized Access!", error:err})
    }
});


module.exports=router