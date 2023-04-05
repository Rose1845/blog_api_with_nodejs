const mongoose = require("../db");

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:false

    },
    photo:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:true
    }
},
{
    timestamps:true
}
)
module.exports=mongoose.model("Post",PostSchema)