const express =  require("express")
const app = express();
const blog = require("./routers/blogRouter")
const user = require("./routers/userRoutes")
const static = require("./routers/staticRouter")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const { validateUser } = require("./middlewares/validation");
const path = require("path")



//database connection

try{mongoose.connect("mongodb+srv://smash:test123@actorsandsongs.xi6ty.mongodb.net/smashblog?retryWrites=true&w=majority&appName=actorsAndSongs")
    .then(()=>{console.log("Database connected")})
    } catch(err){console.log(err)}


//middlewares
app.use(cors({

    origin: 'https://smash-blog.netlify.app/', 
    credentials: true 
    
 }))

 app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://smash-blog.netlify.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});



app.use("/uploads" , express.static(path.join("public","uploads")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :true}))
app.use(cookieParser())


app.use(validateUser)






//registered routes

app.use("/user" , user)



app.use("/blog", blog)
app.use(static)


//listening
app.listen(8000, ()=>{
    console.log("app started in port 8000")
})