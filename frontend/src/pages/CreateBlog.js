import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { useContext, useEffect, useState } from "react"
import BlogSuccess from "./BlogSuccess"
import Notauth from "./Notauth"
import { UserContext } from "../App"



export default function CreateBlog(){
    
const [ blogCreatedStatus , setBlogCreatedStatus ] = useState(false)
const { validatedUser , setValidatedUser }= useContext(UserContext)
const navigate = useNavigate()

// token validation
    const token = document.cookie.split(";")
    .find(cookie => cookie.trim().startsWith(`token=`))

    if(!validatedUser){ return <Notauth/>}
    
    

    async function createBlogHandler(e){
        e.preventDefault()

        console.log("entered create blog handler")

        let formData = new FormData()

        formData.append("coverImage" ,e.target.coverImage.files[0]  )
        formData.append("title" , e.target.title.value )
        formData.append("content" ,e.target.content.value  )

        console.log("form data created :" , formData)

    //   let coverImage = e.target.coverImage.title
    //   let title = e.target.title.value
    //   let content = e.target.content.value

      
//  useEffect(()=>{
      try{
      fetch(`${BACKEND_URL}/blog/createblog`,{
        method : "POST",
        body: formData,
        credentials:"include"
        // headers: {"Content Type": "application/json"}
      }) 
      .then((res)=>{
        console.log("data sent , and received")
        return res.json()})
      .then((data)=>{console.log("message : " , data.message)
        setBlogCreatedStatus(true)
      })
     } catch(err){

        console.log(err)

     }}
    //  ,[])}

return blogCreatedStatus ? <BlogSuccess setBlogCreatedStatus={setBlogCreatedStatus}/> : <div className="container my-2">
        
      <h1 className="my-3"> Create Blog </h1>
       <form  onSubmit={createBlogHandler} encType="multipart/form-data" >
         <div className="mb-3">
                <label htmlFor="coverImage" className="form-label"> Upload cover image </label>

            <input 
                
                name="coverImage"
                type="file"
                className="form-control" 
                id="coverImage" 
                aria-describedby="coverImageHelp"
                required
                />
            
            
        </div>

        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>

            <input 
                name="title"
                type="text"
                className="form-control" 
                id="title" 
                aria-describedby="titleHelp"
                placeholder="Enter your title for the blog..."
                required/>
            
            
        </div>
       


        <div className="mb-3">
            <label htmlFor="exampleInputcontent" className="form-label">Content</label>
            <textarea name="content"
            type="textarea" className="form-control" id="exampleInputcontent"
            placeholder="Enter the content of your blog..."
            required/>
        </div>
   
        <button type="submit" className="btn btn-primary">Submit</button>
        </form></div>}