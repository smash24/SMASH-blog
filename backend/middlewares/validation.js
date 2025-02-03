const { validateToken } = require("../utils/token");

exports.validateUser = function(req,res,next){

    const token = req.cookies['token']

     if(!token){
      
       return next();
     }

      req.user = validateToken(token)
      
      
     

    // console.log( "the cookie in validate user is : ", (req.cookies['token']))
    next();
}