const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const SECRET_KEY = "$M@SH";

exports.generateToken = async function(_id){

    
    
    try {
      const user = await UserModel.findOne({_id})

        // console.log("this is the user who is trying to login - by auth ", user , "his id: " ,_id)

        const payload = {
            _id,
            fullName:user.fullName,
            email:user.email,
            password:user.password
     }
       
     const token = jwt.sign(payload, SECRET_KEY )
     
    //  console.log("his generated : ", token)
     return token ;
        
    } catch (error) {
        console.log(error)
    }
    

}

exports.validateToken = function (token) {
    
    const verifiedUser = jwt.verify(token, SECRET_KEY) 
    return verifiedUser;

}
