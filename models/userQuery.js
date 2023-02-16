const mongoose=require('mongoose');
const userQuerySchema=new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    contact: {
        type: String,
    },
    query: {
        type: String,
    },
    status: {
        type: String,
    },
    remark: {
        type: String,
    }
}, {timestamps: true})

module.exports=mongoose.model("UserQuery",userQuerySchema);