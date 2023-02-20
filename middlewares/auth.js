const jwt=require("jsonwebtoken");

const authentication=(req,res, next)=>{
    const token=req.headers.authentication
    if(token){
        jwt.verify(token, "masai",(err, decoded)=>{
            if(decoded){
                next();
            }else{
                res.send({"msg":"Please login"})
            }
        })
    } else{
        res.send({"msg":"Please login"})
    }
}

module.exports ={
    authentication
}
