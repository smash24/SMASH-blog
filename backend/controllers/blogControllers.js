
const path = require("path")
const BlogModel = require("../models/blogModel")

exports.getBlog= async function(req,res,next) {
    const id = req.params.id
    
    const blog = await BlogModel.findById(id).populate('createdBy');
    // console.log("user inside getblog : ",blog)
    res.json({blog})
}

exports.welcomeBlog=function(req,res){

  
   if(req.user){

    return res.json({
        user: req.user })
   }

   res.json({
    message:"this is from create blog without token"})
    
}



exports.createBlog = async function(req,res,next){
    
console.log("Blog created Sucessfully")

      console.log("req.user is : " , req.user )
      
      const {title , content }= req.body

      

      await BlogModel.create({title , content ,
        coverImage : req.file.filename,
        createdBy : req.user._id
      })
     
    
    return res.json({
        message: "Blog created Sucessfully" })
   }

   exports.homeBlogs= async function(req,res){
       
       const  allBlog = await BlogModel.find({}).sort({createdAt : -1})

       res.json({allBlog})


   }





