const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    roles: {
        type: Array ,
    },
    status: {
        type: Boolean,
    },
    contact: {
        type: String,
    },
    password: {
        type: String,
    },
    createdBy:{
        type: String,
    },
    updatedBy:{
        type: String, 
    },
}, {timestamps: true})

module.exports=mongoose.model("User",userSchema);