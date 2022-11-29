const router=require('express').Router();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

const User= require('../models/user');

const {requireLogin}= require('../middleware/auth')

//Register User       //http://localhost:5000/auth/register
router.post('/register', async(req, res)=>{
    const {name, email, password, roles, createdBy}=req.body;
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
            roles,
            createdBy,
        })
        await user.save();
        return res.status(201).json({message:"User created successfully please login using credentials!"});
    } catch(err) {
         console.log(err.message);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})

// Login User         //http://localhost:5000/auth/login
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
        return res.json({token, 
            user:{name:user.name, email:user.email, roles:user.roles,
                 _id:user._id, createdAt:user.createdAt, updatedAt:user.updatedAt}
                });

    } catch (err){
        // console.log(err.message);
        return res.status(400).json({message:err.message ||"failure", error:err});
    }
});

// Get All User       //http://localhost:5000/auth/users
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

// AUTH      //http://localhost:5000/auth/
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

//Update User //http://localhost:5000/auth/user/63861d1ffbbcb873bc3eccd9
router.put('/user/:id', async(req, res)=>{
    const {name, email, password, roles, updatedBy }=req.body;
    try{
        let id=req.params.id;
        let user =await User.findById(id);
        if(!user){
            return res.status(400).json({error:"User not available with this id!"});
        }
        const hashed_password=await bcrypt.hash(password, 10);
        user=new User({
            _id:id,
            name,
            email,
            password: hashed_password,
            roles,
            updatedBy,
        })
        await User.updateOne({_id: id}, user);
        return res.status(201).json({message:"User Updated successfully!"});
    } catch(err) {
         console.log(err.message);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})


module.exports=router