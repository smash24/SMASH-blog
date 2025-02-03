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

try{mongoose.connect("mongodb://localhost:27019/smashblog")
    .then(()=>{console.log("Database connected")})
    } catch(err){console.log(err)}


//middlewares
app.use(cors({

    origin: 'http://localhost:3000', 
    credentials: true 
    
 }))

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