exports.getStatic=function(req,res,next){
    res.send("<h1>Gold D ROGER</h1>");

}

exports.getLogin=function(req,res){
    const {email,password}  = req.body;
    console.log(email,password);
    res.send("Hi from backend Dashboard")
}

