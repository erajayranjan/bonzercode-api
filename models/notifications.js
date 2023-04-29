const mongoose=require('mongoose');
const notificationsSchema=new mongoose.Schema({
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

module.exports=mongoose.model("Notifications",notificationsSchema);