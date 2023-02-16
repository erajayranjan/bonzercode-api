const mongoose=require('mongoose');
const fileSchema=new mongoose.Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    files: {
        type: Array,
    },
}, {timestamps: true})

module.exports=mongoose.model("uploadFile",fileSchema);