const mongoose = require("mongoose")
const UserModel = require("../models/userModel")
const { generateToken } = require("../utils/token")
const CommentModel = require("../models/commentModel")




exports.getUser=function(req,res,next) {

    
    res.send(`this is user page ${req.params.id}`)
  
}

// url - /user/newuser

exports.createUser= async function(req,res,next) {
    const {fullName , email , password } = req.body

    
    
    

    const user = await UserModel.findOne({email})
     
    if(user){
        return res.json({
            error : "User Already Exist "
        })
    }

    try {
        const newUser = await UserModel.create({fullName , email , password})
       

    } catch (error) {
        console.log(error)
    }
    
    res.json({
        info : "success"
    });
}

// url - /user/login

exports.loginUser = async function(req,res,next) {
    const {email, password } = req.body
    
    
    try {

        const loggingUser = await UserModel.findOne({email})
         
        //user not found response
         if(!loggingUser){
            return res.json({
                error : "User Not Found !!"
            })
            
         }

         // password error response
         if(!password){
            return res.json({
            error : "Password required"
        })}

            if(password !== loggingUser.password){

            return res.json({
                error : "Invalid password"
            })
            
          } 

          //token generation request
          const token = await generateToken(loggingUser._id)
          
          //setting up cookie
          // res.cookie(`token_${loggingUser._id}` , token )

          //token correction starts  ,   before that only 'res.cookie(`token` , token )'  was present
          
           res.cookie(`token` , token , { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None' 
        })

         // res.cookie("token" , token , { sameSite: 'None' , secure : true } )
        
          


          //login success response
          res.json({
            message : "Login Success",
            user : loggingUser,
            token 
          })

      } catch (error) {
        
        console.log(error)
      }
    
     
    

     
}



exports.userComments = async function (req,res) {
     const { comment , id } = req.body
     

     if(comment)
         await CommentModel.create({comment , createdBy : req.user._id , blogId : id })

    const  blogComments = await CommentModel.find({blogId : id}).populate('createdBy')

    
     
     res.json({
        message: "comment stored",
        blogComments
     })}


    //  exports.displayComments = async function (req,res) {
    

    //     const  allComments = await CommentModel.find({})
        
    //     res.json({
    //         message: "all comments retrieved",
    //         allComments
    //     })
    // }




