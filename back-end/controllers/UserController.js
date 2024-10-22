
const User = require("../models/users.js")

const getAllUser = async (req,res) => {
    
    console.log("checks",req.body)
    let user;
    try {
       user = await User.find({}).exec()
      if(user){
        res.status(200).json({
            message:true,
            user
        })
      }else{
        console.log(" user not data");
        
      }
     
        
    } catch (error) {
        res.status(401).json({
            message:false,
        })
    }

}
module.exports={getAllUser}
