const express = require("express");

const { getStatic, getLogin } = require("../controllers/staticControllers");

const router = express.Router()

router.post("/dashboard", getLogin ) 

router.get("/", getStatic ) 



module.exports = router;