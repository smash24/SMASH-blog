import { Link } from "react-router-dom"

export default function BlogSuccess({setBlogCreatedStatus}){

return <div className="my-5 container"> <h3 > Blog created successfully </h3> 
<Link to="/createblog" className={"my-5 btn btn-success"} onClick={(e)=>{
            e.preventDefault()
            setBlogCreatedStatus(false)}}    > 
              Create another blog
        </Link> &nbsp;
        
        <Link to="/home" className="my-5 btn btn-primary"    > 
              Home 
        </Link>

 </div>}

// onClick={(e)=>{
//     e.preventDefault()
//     setBlogCreatedStatus(false)}} 