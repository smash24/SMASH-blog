import { Link, useNavigate, useSearchParams } from "react-router-dom"
import '../css/App.css';
import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function SignUp(){
    const [messageInSignup, setMessageInSignup] = useState("")
    const navigate = useNavigate()
    

    async function  signUpHandler(e){
        e.preventDefault()
        console.log(e)
  
        const email = e.target.email.value; 
        const password = e.target.password.value; 
        const fullName = e.target.fullName.value;
        
        try {
               

               if(!password || password.length < 5 ){
                
                setMessageInSignup("Password is required and minimum length must be 5")
                throw new Error("Password is required")
             } 


               await fetch(`${BACKEND_URL}/user/newuser`, {
                  method:"POST",
                  body: JSON.stringify({fullName,
                     email: email.toLowerCase() ,
                     password}),
                  headers: {
                      "Content-Type":"application/json"
  
                  }
  
  
               })
              .then((res)=>{
                  console.log("fetch Successfull")
                  return res.json()})
              .then((data)=>{console.log(data)
                if(data.error){
                    throw new Error(data.error)}
              })

              navigate("/login?status=1" )
 
                          
                  
        } catch (error) {
            console.log("error catched")
            setMessageInSignup(error.message)
            console.log(error)

        } }
        
        
return <div className="container my-2">

     {messageInSignup && <h4 className="mt-4 alert alert-danger">{messageInSignup}</h4>}
     <h1 className="mt-2 mb-4">Sign Up </h1> 
        <form onSubmit={signUpHandler} >


        <div className="mb-3">
             <label for="fullNameInput" className="form-label">Full name</label>

                <input 
                name="fullName"
                type="text"
                className="form-control" 
                id="fullNameInput" 
                aria-describedby="fullNameHelp"
                placeholder="Enter your full name..."
                required/>
            
            
            </div>

            <div className="mb-3">
             <label for="exampleInputEmail1" className="form-label">Email address</label>

                <input 
                name="email"
                type="email"
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                placeholder="Enter your email id..."
                required />
            
            
            </div>

            
            
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input name="password"
                type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
    
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <h3 className="my-4">OR</h3>
            <Link to={"/login"} className="text-white text-white-link" >Login if you are existing user </Link>
            
            </div>
}
