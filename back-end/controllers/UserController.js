
const User = require("../models/users.js");
const Income = require("../models/incomes.js");
const Expense = require("../models/expense.js");

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
        success: true,
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
      const client = { userId: user._id, username: user.username };
      const token = jwt.sign(client, process.env.ACCESS_TOKEN);
      return res.status(200).json({
        message: true,
        username: user.username,
        userID: user._id,
        accessToken: token
      })
    }

  }
}


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
      message: " valid budget ",
      success: true,
      totalimo: totalimo
    });
  }
}
async function taxDeduction(req, res) {

  const { userID } = req.body;
  const user = await User.findOne({ _id: userID });
  Budget(userID);
  let total = user.balance;

  const taxTable = new  Map();
  const array =  [];

  array.push(0);
  array.push(5000000);
  array.push(10000000);
  array.push(18000000);
  array.push(32000000);
  array.push(52000000);
  array.push(80000000);

  taxTable.set(0, 0.0);
  taxTable.set(5000000, 0.05);
  taxTable.set(10000000, 0.1);
  taxTable.set(18000000, 0.15);
  taxTable.set(32000000, 0.2);
  taxTable.set(52000000, 0.25);
  taxTable.set(80000000, 0.3);


  let taxTableIncome = total - 11000000*12 - 1500000*12;
  let taxIncome = 0;

  if (taxTableIncome > 0) {
    for (let index = 1; index < array.length; index++) {

      taxIncome = taxIncome + (Math.min((array[index] - array[index-1]), taxTableIncome) * taxTable.get(array[index]))

      taxTableIncome = taxTableIncome - (array[index] - array[index - 1])

      taxTableIncome = Math.max(taxTableIncome,0)

    }
  }
  console.log(taxIncome);

  return res.status(200).json({
    success: true,
    taxIncome
  });


}


  async function tableUser_expense(req, res){

    const  outlist = [];

    const re = await User.find()
    
    for await (const userOut of re) {
      if(userOut.listExpense.length > 0){
        outlist.push(userOut);
      } 
    }
      
    return res.status(200).json({
      message: " valid budget ",
      success: true,
      outlist
    });

  }









module.exports = {
  getAllUser,
  loginUser,
  registeredUser,
  NotificationBudget,
  tableUser_expense,
  taxDeduction,
}