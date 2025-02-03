import { Link } from "react-router-dom";

export default function Notauth(){

    return <>
    <div className="text-center" >
    <div className="container">
    <h1 className="my-5" >You are not authorized to view this page !</h1>

    
        <h4>
            <Link to={"/login"} className="text-decoration-none ">
            &ndash;&ndash;&gt; kindly login &lt;&ndash;&ndash;
            </Link>
        </h4>
    </div>
       
    
    </div>
    </>
  }
