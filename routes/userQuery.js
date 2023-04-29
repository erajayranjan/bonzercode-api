const router=require('express').Router();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserQuery= require('../models/userQuery');

const {requireLogin}= require('../middleware/auth');
const testEmail = require('./notification');

// Get All UserQuery
router.get('/all-userQuery', async(req, res)=>{
    try{
        let userQuery =await UserQuery.find();
        if(!userQuery){
            return res.status(400).json({error:"No userQuery found!"});
        }
        return res.status(200).json({message:"success", data:userQuery});
    } catch(err) {
         console.log(err);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})

// Get UserQuery by Id
router.get('/:id',  async(req, res)=>{
    try{
        let id=req.params.id
        let userQuery =await UserQuery.findById(id);
        if(!userQuery){
            return res.status(400).json({error:"No userQuery found!"});
        }
        return res.status(200).json({message:"success", data:userQuery});
    } catch(err) {
         console.log(err.message);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})

//Add UserQuery
// router.post('/add-userQuery', requireLogin, async(req, res)=>{
router.post('/add-userQuery', requireLogin,  async(req, res)=>{
    const {name, email, contact, query, status, remark }=req.body;
    // console.log(req.body )
    try{
        // let userQuery =await UserQuery.findOne({name});
        // if(userQuery){
        //     return res.status(400).json({error:"UserQuery already exists with this name!"});
        // }
        let userQuery=new UserQuery({
            name, email, contact, query, status, remark
        })
        const userQuerySaved= await userQuery.save();
        userQuerySaved && res && console.log(userQuerySaved)
        return res.status(201).json({status:201, message:"Your query sent successfully!", data:userQuerySaved});
    } catch(err) {
         console.log(err.message);
         return res.status(400).json({message:err.message ||"failure", error:err});
        }
})
//Add GuestQuery
// router.post('/add-guestQuery', requireLogin, async(req, res)=>{
    router.post('/add-guestQuery',  async(req, res)=>{
        const {name, email, contact, query, status, remark }=req.body;
        // console.log(req.body )
        try{
            // let userQuery =await UserQuery.findOne({name});
            // if(userQuery){
            //     return res.status(400).json({error:"UserQuery already exists with this name!"});
            // }
            let userQuery=new UserQuery({
                name, email, contact, query, status, remark
            })
            const userQuerySaved= await userQuery.save();
            // if(userQuerySaved && res ){
            //     console.log(userQuerySaved)
            //     console.log("userQuerySaved>>>>",userQuerySaved)
            //     // testEmail("testing_____emailllll");
            // }
            return res.status(201).json({status:201, message:"Your query sent successfully!", data:userQuerySaved});
        } catch(err) {
             console.log(err.message);
             return res.status(400).json({message:err.message ||"failure", error:err});
            }
    })
    
//Edit UserQuery
    router.put('/edit-userQuery/:id', requireLogin,  async(req, res)=>{
        let id=req.params.id
        const {name, email, contact, query, status, remark }=req.body;
        console.log(req.body )
        try{
            let userQuery =await UserQuery.findOne({id});
            console.log("the data>>>>>",userQuery)
            // if(userQuery){
            //     return res.status(400).json({error:"UserQuery already exists with this name!"});
            // }
             userQuery=new UserQuery({
                name, email, contact, query, status, remark
            })
            const userQuerySaved= await userQuery.updateOne();
            // if(userQuerySaved && res ){
            //     console.log("userQuerySaved>>>>",userQuerySaved)
            //     testEmail();
            // }
            return res.status(201).json({status:201, message:"Data updated successfully!", data:userQuerySaved});
        } catch(err) {
             console.log(err.message);
             return res.status(400).json({message:err.message ||"failure", error:err});
            }
    })


router.get('/', requireLogin, async (req, res)=>{
    console.log(req.userQuery)
    try {
        const userQuery= await UserQuery.findById(req.userQuery._id).select("-password");
        res.json({userQuery});
    } catch (err){
        console.log(err);
        return res.status(400).json({message:err.message ||"failure", error:err});
    }
});


module.exports=router