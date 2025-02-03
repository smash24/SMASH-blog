const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    fullName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"normal"    
    },
    profilePicture:{
        type:String,   
    }


},{timestamps : true })

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel;