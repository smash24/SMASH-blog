
import './css/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route, RouterProvider}  from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import { createContext, useRef, useState } from 'react';
import CreateBlog from './pages/CreateBlog';
import ViewBlog from './pages/ViewBlog';
import Notauth from './pages/Notauth';
import NotFound from './pages/NoPage';

//creating Context
const UserContext = createContext()


function App() {
  
  

  //state value for Create blog heading
  const [createBlogEnabler , setCreateBlogEnabler ] = useState(false)
  const userRef = useRef();


  return (<>
  <UserContext.Provider value={{createBlogEnabler , setCreateBlogEnabler,  userRef }}>
  <Router>
  <div className="App">
    <header className="App-header">
      <Navbar/>
      

              <Routes>

                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/createblog" element={<CreateBlog/>}/>

                {/* <ErrorBoundary> */}
                <Route path="/blog/:id" element={<ViewBlog/>}/>
                {/* </ErrorBoundary> */}

                <Route path="*" element={<NotFound/>}/>
               
              </Routes>


        
      </header>
    </div>
    </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
export {UserContext};
