
const {database} = require("./config/db");
const express = require("express");
const { getAllUser, loginUser, registeredUser, Tableuser_expense, tableUser_expense, taxDeduction,GetInfoByUserId, NotificationBudget } = require("./controllers/UserController");
const {addExpense,findAllExpense,findExpenseByUserId,deleteExpenseById, UpdateExpense} =require("./controllers/ExpenseController");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { getAllincome, createIncome, deleteIncome, UpdateIncome, createIncomeByUserName, GetIncomeByUserId } = require("./controllers/IncomeController");
const { AuthController } = require("./controllers/AuthController");
const app = express();


database();

app.use(express.json());

app.use(cookieParser());
app.use(cors());



app.listen(5000,()=>console.log("Server listen at port 5000"));
//user
app.get("/users",getAllUser);

app.get("/notification",AuthController,NotificationBudget);

app.post("/signin",loginUser);

app.post("/signup",registeredUser);

app.get("/tableUser_expense",tableUser_expense);

app.post("/taxDeduction",taxDeduction);

app.get("/getIncome/:userID",AuthController,GetInfoByUserId);



//income
app.get("/income",AuthController,getAllincome);

app.post("/income/create",AuthController,createIncome);
app.post("/income/create/:username",AuthController,createIncomeByUserName);

app.delete("/income/:id",AuthController,deleteIncome);
app.put("/income/:id",AuthController,UpdateIncome);

//expense

app.get("/expense",AuthController,findAllExpense);
app.post("/expense",AuthController,findExpenseByUserId);
app.put("/expense/:id",AuthController,UpdateExpense);
app.delete("/expense/:id",AuthController,deleteExpenseById);
app.post("/expense/create",AuthController,addExpense);


