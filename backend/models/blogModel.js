const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({

    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
        
    },
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    
    coverImage:{
        type:String,   
        
    }


},{timestamps : true })

const BlogModel = mongoose.model("Blog",blogSchema)

module.exports = BlogModel;