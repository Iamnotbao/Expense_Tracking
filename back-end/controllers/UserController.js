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
const editUser = async (req, res) => {

  const { userID, username, email, phone, address, role_id } = req.body;
  console.log("Received data:", { userID, username, email, phone, address, role_id });
  const ExistUser = await User.findOne({ _id: userID });
  try {
    if (ExistUser) {
      ExistUser.username = username;
      ExistUser.email = email;
      ExistUser.phone = phone;
      ExistUser.address = address;
      ExistUser.role_id = role_id;
      ExistUser.save();
      return res.status(200).json(ExistUser);
    }
  } catch (error) {
    return res.status(500).send("error while editting");
  }
}
const deleteUser = async (req, res) => {
  console.log("Running delete user");
  const { userID } = req.body;

  // Kiểm tra xem userID có tồn tại trong request body không
  if (!userID) {
    return res.status(400).send("User ID is required");
  }

  try {
    // Tìm và xóa người dùng trong một bước với findOneAndDelete
    const result1 = await User.findOne({ _id: userID });
    if (result1.listIncome != null) {

      for (const item of result1.listIncome) {

        console.log("check item", item.income._id);

        await Income.deleteOne({ _id: item.income._id });

      }

    }
    if (result1.listExpense != null) {


      for (const item of result1.listExpense) {
        console.log("check item", item.expense._id);
        await Expense.deleteOne({ _id: item.expense._id });

      }

    }
    const result = await User.findOneAndDelete({ _id: userID });

    if (result) {
      return res.status(200).send("User deleted successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error); // Log lỗi để dễ dàng theo dõi
    return res.status(500).send("Error while deleting user");
  }
};

const loginUser = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const user = await User.findOne({ username: username }).populate('listIncome.income').populate('listExpense.expense').exec();

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

      const newBan = await Budget(user._id);

      user.balance = newBan[0];
      user.income = newBan[1];
      user.balance = newBan[2];
      user.save();

      const client = { userId: user._id, username: user.username };
      const token = jwt.sign(client, process.env.ACCESS_TOKEN);
      return res.status(200).json({
        message: true,
        username: user.username,
        user_role: user.role_id,
        userID: user._id,
        user: user,
        accessToken: token,
      })


    }

  }
}


//transfer to PDF 
//Profile



async function Budget(userID) {
  const user = await User.findOne({ _id: userID });
  let total = 0;
  let totalIncome = 0;
  let totalExpense = 0;
  if (user.listIncome.length > 0) {
    for (const item of user.listIncome) {
      const income = await Income.findOne({ _id: item.income })
      if (income) {
        total += income.amount;
        totalIncome += income.amount;
      }
    }
  }

  if (user.listExpense.length > 0) {
    for (const item of user.listExpense) {
      const expense = await Expense.findOne({ _id: item.expense })
      if (expense) {
        total -= expense.amount;
        totalExpense += expense.amount;
      }
    }
  }
  return [total, totalIncome, totalExpense];
}

async function NotificationBudget(req, res) {
  console.log("in notification");
  const { userID } = req.body;
  const totalimo = await Budget(userID);
  console.log(totalimo[0]);
  if (totalimo[0] < 0) {
    const user = await User.findOne({ _id: userID });
    // console.log("check balance",user.balance);
    user.balance = 0;
    user.income = totalimo[1];
    user.expense = totalimo[2];
    await user.save();
    return res.status(200).json({
      message: " Over budget ",
      success: false,
      totalimo: totalimo
    }
    );
  } else {
    const user = await User.findOne({ _id: userID });
    // console.log("check balance",user.balance);
    user.balance = totalimo[0];
    user.income = totalimo[1];
    user.expense = totalimo[2];
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

  const table = new Map();
  let tableout = new Map();

  const taxTable = new Map();
  const array = [];

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

  for (const income of user.listIncome) {
    const input = await Income.findOne({ _id: income.income });

    if (table.get(input.month) == null) {
      table.set(input.month, input.amount);
    } else {
      table.set(input.month, table.get(input.month) + input.amount);
    }
  }
  // console.log(table.keys);

  const keysArray = Array.from(table.keys())

  for (const key of keysArray) {


    let total = table.get(key);
    const valueOftableout = [];
    valueOftableout.push(total)





    let taxTableIncome = total - 11000000 - 1500000;
    let taxIncome = 0;

    if (taxTableIncome > 0) {
      for (let index = 1; index < array.length; index++) {

        taxIncome = taxIncome + (Math.min((array[index] - array[index - 1]), taxTableIncome) * taxTable.get(array[index]))

        taxTableIncome = taxTableIncome - (array[index] - array[index - 1])

        taxTableIncome = Math.max(taxTableIncome, 0)

      }
    }
    valueOftableout.push(taxIncome)
    valueOftableout.push(valueOftableout[0] - taxIncome);
    tableout.set(key, valueOftableout);
    // console.log(taxIncome);
  }

  console.log(tableout);
  

  const obj = Object.fromEntries(tableout)

  return res.status(200).json({
    success: true,
    table12: obj,
  });


}


async function tableUser_expense(req, res) {

  const outlist = [];

  const re = await User.find().populate('listIncome.income').populate('listExpense.expense').exec();

  for await (const userOut of re) {
    if (userOut.listExpense.length > 0) {
      outlist.push(userOut);
    }
  }

  return res.status(200).json({
    message: " valid budget ",
    success: true,
    outlist
  });

}



const GetInfoByUserId = async (req, res) => {
  const { userID } = req.params;
  const userExist = await User.findOne({ _id: userID }).populate('listIncome.income').populate('listExpense.expense').exec();
  if (userExist) {
    console.log("done")
    return res.json(userExist);
  } else {
    console.log("user not found id : " + userID);
    return res.status(404).json({ error: "User not found" });
  }
}

module.exports = {
  getAllUser,
  loginUser,
  registeredUser,
  NotificationBudget,
  tableUser_expense,
  taxDeduction,
  GetInfoByUserId,
  editUser,
  deleteUser,
}