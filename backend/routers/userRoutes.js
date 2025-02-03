const express = require("express");
const { getUser, createUser, loginUser, userComments } = require("../controllers/userControllers");




const router = express.Router()

// router.get("/:id", getUser )

router.post("/newuser",createUser )

router.post("/login", loginUser )

router.post("/comment" , userComments)



module.exports = router;