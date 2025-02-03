import { Fragment, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";


const Home = function(){

    const [blogs , setBlogs ] = useState([])

    //requesting blogs

    useEffect(()=>{
    fetch(`${BACKEND_URL}/blog/home`)
    .then(res => res.json())
    .then(data => {console.log("data received" , data.allBlog)
          setBlogs(data.allBlog)
    })
},[])
     

return <div className="container text-center">

    <h1 className="my-4">Trending Blogs</h1>

     { blogs.length > 0 ? <div className="container-fluid">
        <div className="row"> {blogs.map((blog,index)=>{ 
            return <div key={index}  className="col-lg-4 col-md-6"  > 
              <div className="card mx-2 my-3" >
             {/*//style={{width: "18rem"}} */}
             
                <img src={`${BACKEND_URL}/uploads/${blog.coverImage}`}
                          className=" card-img-top rounded" 
                          alt={`${blog.title}`}
                          style={{ height: "15rem" }}
                          loading="lazy" />

                   <div className="card-body">
                    <h5 className="card-title">{`${blog.title}`}</h5>
                    <p className="card-text" >{`${blog.content}`}</p>
                    <Link to={`/blog/${blog._id}`} className="btn btn-primary"
                    style={{ position: "absolute", left: "38%" , bottom: "20px" }}>
                        
                        View Blog
                        
                    </Link>
        </div>
        </div></div>})}  </div></div> : <p>No Blogs available to show </p> }

</div>}

export default Home;