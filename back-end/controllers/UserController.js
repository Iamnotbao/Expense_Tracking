
const User = require("../models/users.js");
const { HashPassword, ComparedPassword } = require("../service/HashPassword.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

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
      console.log(" user in data");
    }


  } catch (error) {
    res.status(401).json({
      message: false,
    })
  }

}
const registeredUser = async (req, res) => {
  const { username, password, email, phone, address, notification } = req.body;
  console.log("Received data:", req.body);
  const userExist = await User.findOne({ username: username });
  if (userExist) {
    return res.status(401).json({
      success: false,
      errorCode: 100,
      message: "This user is already exist!"
    })
  }
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
        notification: notification,
      })
      console.log("this user is create", user);
      req.session.localUser = {
        userId: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        create_at: user.create_at,
        create_by: user.create_by,
        role_id: user.role_id,
        notification: user.notification,
        listIncome: user.listIncome,
        listExpense: user.listExpense,
      };
      
      console.log("check"+req.session);
      

      await user.save();
      return res.status(200).json({
        success: true,
        session: req.session,
        message: "User has been add !!!"
      })
    } else {
      return res.status(401).json({
        success: false,
        message: "This user is already in use!"
      })
    }



  } catch (error) {

  }



}

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    const user = await User.findOne({ username: username });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        errorCode: 100,
        message: "Doesn't have this user!!!"
      })
    }
    if (password) {
      const existUser = await ComparedPassword(password, user.password);
      if (existUser) {

      }
      const client = { userId: user._id, username: user.username };
      const token = jwt.sign(client, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      req.session.localUser = {
        userId: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        create_at: user.create_at,
        create_by: user.create_by,
        role_id: user.role_id,
        notification: user.notification,
        listIncome: user.listIncome,
        listExpense: user.listExpense,
      };
      console.log("check session "+JSON.stringify(req.session.localUser) );
      return res.status(200).json({
        success: true,
        session: req.session,
        message: "Login Successfully" 
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      errorCode: 500,
      message: "Internal server error!",
    });
  }
}
  module.exports = {
    getAllUser,
    loginUser,
    registeredUser
  }