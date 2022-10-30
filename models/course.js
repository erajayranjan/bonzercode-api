const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    course_name: {
        type: String,
    },
    course_title: {
        type: String,
    },
    description: {
        type: String,
    },
    overview: {
        type: String,
    },
    images: {
        type: Array,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    selling_price: {
        type: Number,
    },
}, {timestamps: true})

module.exports=mongoose.model("Course",courseSchema);