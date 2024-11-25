const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthController =(req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if(token == null){
        return res.status(401).json({
            success:false,
            message:"You are not login",
        })
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message:"Cannot verify token"
            })
        }
        next()
    })

    

}
module.exports={AuthController}