import { useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import { BACKEND_URL } from "../config"
import { Link, useNavigate } from "react-router-dom"
import Notauth from "./Notauth"

export default function Dashboard (){
 
    const [user,setUser] = useState()
       const { userRef }= useContext(UserContext)

    let currUser;
    let token;


    
    
    const navigate = useNavigate()
    
    // const params = new URLSearchParams(window.location.search)
    // let name = params.get("query")

    useEffect(()=>{

        function fetchUser(){
            try {
        
                fetch(`${BACKEND_URL}/blog/welcomeblog`,{
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(data => {

                console.log("user data from dashboard : "  , data.user)

                // token = document.cookie.split(";")
                //        .find(cookie => cookie.trim().startsWith(`token=${data.user._id}`))

                

                    setUser(data.user)
                    // return data.user;
                })
        
            } catch (error) {
                
            }}

            
             fetchUser();
            

           
            
    },[])

    

      
    

    // //token validation
    token = document.cookie.split(";")
    .find(cookie => cookie.trim().startsWith(`token=`))

     if(!token){ return <Notauth/>}
    
    
      
      
      
    
    
   
    
    
    
     
    return <div className="container text-center">


        {user ? <h1>Login Successfull , Welcome Mr. {user.fullName} </h1> : <h1>loading...</h1>}
    
         

    </div> }
    
  
    