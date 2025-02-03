const express = require("express");
const { createBlog, welcomeBlog, homeBlogs, getBlog, displayComments } = require("../controllers/blogControllers");
const multer = require("multer");
const path = require("path")


const router = express.Router()

router.get("/home" , homeBlogs )



router.post("/welcomeblog", welcomeBlog )
// router.get("/comments", displayComments )

router.get("/:id", getBlog )


//multer config
let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,"..","public","uploads"))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

let uploadedDoc = multer({storage})


router.post("/createblog",uploadedDoc.single("coverImage"), createBlog)



module.exports = router;