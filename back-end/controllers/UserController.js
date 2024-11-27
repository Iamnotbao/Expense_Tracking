
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
      console.log(" user not data");
    }


  } catch (error) {
    res.status(401).json({
      message: false,
    })
  }

}
const registeredUser = async (req, res) => {
  const { username, password, email, phone, address } = req.body;
  console.log(username + " " + password);
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
      })
      console.log("this user is create", user);
      await user.save();
      return res.status(200).json({
        success:true,
        message:"User has been add !!!"
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
  if(password){
    const existUser = await ComparedPassword(password, user.password);
    if(existUser){
      const client = {userId : user._id, username: user.username};
      const token = jwt.sign(client,process.env.ACCESS_TOKEN);
      return res.status(200).json({
        message:true,
        username:user.username,
        userID:user._id,
        accessToken:token
      })
    }
   
  }
}

//Budget
//Notification Budget
//Tax Deduction
//transfer to PDF 
//Profile



async function Budget(userID) {
  const user = await User.findOne({ _id: userID });
  let total = 0;

  for (const item of user.listIncome) {
    const income = await Income.findOne({ _id: item.income })
    total += income.amount;
  }

  for (const item of user.listExpense) {
    const expense = await Expense.findOne({ _id: item.expense })
    total -= expense.amount;
  }
 
  return total;
}

async function NotificationBudget(req, res) {

  const { userID } = req.body;
  const totalimo = await Budget(userID);
  console.log(totalimo);
  if (totalimo < 0) {
    return res.status(401).json({
      message: " Over budget ",
       totalimo: totalimo
    }
    );
  } else {
    const user = await User.findOne({ _id: userID });
   // console.log("check balance",user.balance);
    user.balance = totalimo;
    await user.save();
    return res.status(200).json({
      message : " valid budget ",
      success : true,
     totalimo : totalimo
    });
  }
}


module.exports = {
  getAllUser,
  loginUser,
  registeredUser,
  NotificationBudget,
}