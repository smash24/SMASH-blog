import { Link, useNavigate, useSearchParams } from "react-router-dom"
import '../css/App.css';
import { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { UserContext } from "../App";




export default  function Login(){

    const navigate = useNavigate()
    const [message , setMessage] = useState("")
    const [errorOn , setErrorOn] = useState(false)

    const [queryParams] = useSearchParams()

    let status = queryParams.get('status')

    const {createBlogEnabler,setCreateBlogEnabler , userRef}= useContext(UserContext)
    
    
    

    useEffect(()=>{
        switch (status) {
            case "1":
                setMessage("Signup successfully completed ! ")
                break;
            

         }
         


    },[])
    

      async function  loginHandler(e){
      e.preventDefault()
      
 
      const email = e.target.email.value; 
      const password = e.target.password.value; 
      let fetchedName;
      let  token;
      
      
      
      try {
             await fetch(`${BACKEND_URL}/user/login`, {
                method:"POST",
                body: JSON.stringify({
                    email : email.toLowerCase(),
                    password}),
                headers: {
                    "Content-Type":"application/json"},

                credentials:"include"


             })
            .then((res)=>{
                console.log("fetch Successfull")
                
                return res.json()})

            .then((data)=>{console.log(data.user)
                if(data.error){
                   throw new Error(data.error)}
                
                   userRef.current = data.user

                   console.log("user is setted to userRef");

                   localStorage.setItem("user" , JSON.stringify(data.user) )
                   
                fetchedName = data.user.fullName

                // //token receival at frontend
                 token = data.token;
            })
             

            
            

            setCreateBlogEnabler(true)
            navigate(`/dashboard`)

            // try{
            // if(token){
                 
            // }} catch (err){
            //     console.log(err)
            // }
            
                
      } catch (err) {
         console.log(err)
         setErrorOn(true)
         setMessage(err.message)

      } 
      

      console.log('Email:', email);
      console.log('Password:', password);

      
 }

return <>
    {message && <h3 className= {`container my-4 alert ${ errorOn ? "alert-danger" :"alert-success"}`} >{message}</h3>} 
 
    
    
   <div className="container my-2">
    
      <h1 className="my-3">Login</h1>
       <form onSubmit={loginHandler} >
         <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>

            <input 
                name="email"
                type="email"
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                placeholder="Enter your email id..."/>
            
            
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input name="password"
            type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
   
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <h3 className="my-4">OR</h3>
        <Link to={"/signup"} className="text-white text-white-link"> Create a New Account </Link>
        </div></>
}   


     {/* <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div> */}{/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}

