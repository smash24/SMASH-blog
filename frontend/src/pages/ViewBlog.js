import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";


export  default function ViewBlog(){
    const {userRef} = useContext(UserContext)
    const {id} = useParams()
    const [blog, setBlog] = useState()
    const [commentBox, setCommentBox] = useState("")
    const [commentsPresent, setcommentsPresent ] = useState(true)
    const [comments , setComments] = useState([])
    const navigate = useNavigate()

    
    
    useEffect(()=>{
    try{ 

    fetch(`${BACKEND_URL}/blog/${id}`)
    .then(res=> res.json())
    .then(data => {
        setBlog(data.blog)
    })
     
    } catch(err){
      console.log(err)
    }
    
    // //comments fetch
    try{
        fetch(`${BACKEND_URL}/user/comment`,{
            method:"post",
            body: JSON.stringify({id}),
            headers:{ 
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>res.json())
        .then(data => {
            
            

            if(!data.blogComments[0]){
                
                setcommentsPresent(false)
            }else{
                if(!commentsPresent)
                   setcommentsPresent(true)
            }
            
            data.blogComments.map((comment)=>
            setComments(prev => [...prev , { userName: comment.createdBy.fullName, text: comment.comment }])
        )
        })
        } catch (err){ }



},[])

    

    function commentHandler(e){
        e.preventDefault()
        setComments([])
        setcommentsPresent(true)
        setCommentBox("")
        const comment = e.target.comment.value

    try{
        fetch(`${BACKEND_URL}/user/comment`,{
            method:"post",
            body: JSON.stringify({comment , id }),
            headers:{ 
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>res.json())
        .then(data => {
           
            
            
            data.blogComments.map((comment)=>
            setComments(prev => [...prev , { userName: comment.createdBy.fullName, text: comment.comment }])
        )
        })
        } catch (err){ }
    }

    return blog ? <>
    <div className="container text-center">
    <div>
    <img className="my-5 rounded" style={{width:"70%"}} src={`${BACKEND_URL}/uploads/${blog.coverImage}`}
    loading="lazy"/>
    <h1>{blog.title}</h1>
    <p className="my-3" >{blog.content}</p>
    <p className="mt-5">Posted By : <b>{blog.createdBy.fullName}</b></p>

   

     <h3 > Comments ( {comments.length} ) </h3>
                         
     { !userRef.current ?  <h4>  Kindly login to comment </h4> : <></>}
     

     {/* comments rendering */}

    { commentsPresent ? <ul>
        
        { comments.map((comment , index )=>{ 
                
                return <>
                <li key={index} >{comment.userName + " : " + comment.text}</li>
                </>

        })}</ul> : <p> Be first to comment on this post </p> }


    <button onClick={(e)=>{e.preventDefault() 
        navigate("/")
    }} className="btn  btn-primary"> Home </button>
    <br/><br/>

     {/* comments entering */}

    { userRef.current && <div className="container ">
    <div >
        {/* <div className="row" > */}

    
    <form className="input-group mt-2" onSubmit={commentHandler}>

    <div className="form-control commentBox">
    

    <input className= "form-control" type="text" 
           name="comment" placeholder="Enter your comments..."
           value={commentBox}
        //   onBlur={searchHandler}
          
          onChange={(e) => {
            setCommentBox(e.target.value);}}
/>
         
    </div>

    <button className="btn btn-info rounded" > Post </button></form>
    </div>
    
    </div>}

    </div> 
        
    <br/><br/>
    </div>
    
    </> : <p> Loading... </p>
}