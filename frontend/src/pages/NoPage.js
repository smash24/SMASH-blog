
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (<>
        <div className="container text-center my-5">
            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        
        <h4>
        <Link to={"/home"} className="text-decoration-none ">
        &ndash;&ndash;&gt; Return to Home Page &lt;&ndash;&ndash;
        </Link>
    </h4></div></>
    );
};

export default NotFound;
