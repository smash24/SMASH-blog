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


//solving cors error starts

// Allowed origins
const allowedOrigins = ['https://smash-blog.netlify.app', 'http://localhost:3000'];

// CORS middleware
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, CURL, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Dynamic CORS header setting
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});








//solving cors error stops

// //middlewares
// app.use(cors({

//     origin: ['https://smash-blog.netlify.app', 'https://localhost:3000'],
//     credentials: true 
    
//  }))

//  app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://smash-blog.netlify.app');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });



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