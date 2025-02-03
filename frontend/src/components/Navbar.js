import { Fragment, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Navbar(){
    
    const navigate = useNavigate()
    const {createBlogEnabler,setCreateBlogEnabler,userRef}= useContext(UserContext)

    userRef.current = JSON.parse(localStorage.getItem("user"))
    

    // useEffect(() => {
    //     const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    //     if (token) {
    //         setCreateBlogEnabler(true);
    //     }
    // }, []); // Empty dependency array 
    

    useEffect(()=>{
        
         const token = document.cookie.split(";").find((cookie)=>{return cookie.trim().startsWith("token=")})
        
        if(token){
            setCreateBlogEnabler(true)
        }
    
    },[])
    

    function logoutHandler(){
        
        document.cookie = "token= ; expires=Thu, 01 Jan 1970 00:00:00 UTC ; path=/;"
        localStorage.removeItem('user') 
        setCreateBlogEnabler(false)
        

    }

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                
            <Link to={"/"} className="navbar-brand">SMASH Blog</Link>

            <button className="navbar-toggler" type="button" 
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">

                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">

                <Link to="/home" className="nav-link text-decoration-none active">
                    Home
                </Link>
                </li>

                {createBlogEnabler && <Fragment>
                <li className="nav-item">
                    <Link to="/createblog" className="nav-link text-decoration-none ">
                       Create Blog
                    </Link>
                </li>
                
                </Fragment>}

                {!createBlogEnabler && <Fragment>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link text-decoration-none">
                           Sign Up / Login
                        </Link>
                    </li>
                </Fragment>}

                { createBlogEnabler && <> <li className="nav-link"><Link to={"/login"} className="dropdown-item"
                     onClick={logoutHandler}>
                       Log out
                    </Link></li>

                    <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userRef.current.fullName}
            </a>
            <ul className="dropdown-menu">

            
                    <Link to={"/login"} className="dropdown-item"
                     onClick={logoutHandler}>
                       Log out
                    </Link>
                

                {/* <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                
            </ul>
        </li></>
          
          }



                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>


        </ul>
      </div>
    </div>
  </nav>
}

export default Navbar;