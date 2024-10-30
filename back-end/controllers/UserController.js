
const User = require("../models/users.js");
const { HashPassword } = require("../service/HashPassword.js");

const getAllUser = async (req, res) => {
  let user;
  try {
    user = await User.find({}).exec()
    if (user) {
      return res.status(200).json({
        message: true,
        user
      })
    } else {
      console.log(" user not data");
    }


  } catch (error) {
    res.status(401).json({
      message: false,
    })
  }

}
<<<<<<< HEAD
const registeredUser = async (req, res) => {
  const { username, password, email, phone, address } = req.body;
  console.log(username + " " + password);
  const userExist = await User.findOne({ username: username });
  try {
    if (!userExist) {
      const hashPassword = await HashPassword(password);
      console.log("Your password after hasing checking :", hashPassword);
      const user = new User({
        username: username,
        password: hashPassword,
        email: email,
        phone: phone,
        address: address,
        create_at: new Date(),
        create_by: username,
        update_at: null,
        update_by: username,
      })
      console.log("this user is create", user);
      await user.save();
    } else {
      return res.status(401).json({
        success: false,
        message: "This user is already in use!"
      })
    }



  } catch (error) {

=======
const registeredUser= async(req,res)=>{
  const {username,password,email,phone, address} = req.body;
  console.log(username+" "+password);
  const userExist = await User.findOne({username:username});
try {
  if(!userExist){
    const hashPassword = await HashPassword(password);
    console.log("Your password after hasing checking :", hashPassword);
    const user = new User({
      username:username,
      password:hashPassword,
      email:email,
      phone:phone,
      address:address,
      create_at:new Date(),
      create_by:username,
      update_at:null,
      update_by:username
    })
    console.log("this user is create",user);
    await user.save();
  }else{
    return res.status(401).json({
      success:false,
      message:"This user is already in use!"
    })
>>>>>>> 206ad1271b2de1d2f7f5996bff86b6a2364ddd43
  }



}

const loginUser = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const user = await User.find({ username: username });
  if (user) {
    return res.status(401).json({
      success: false,
      errorCode: 100,
      message: "This user is already exist!"
    })
  }
}
module.exports = {
  getAllUser,
  loginUser,
  registeredUser
}