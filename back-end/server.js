
const {database} = require("./config/db");
const express = require("express");
const { getAllUser, loginUser, registeredUser } = require("./controllers/UserController");
const {addExpense,findAllExpense,findExpenseByUserId,deleteExpenseById} =require("./controllers/ExpenseController");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { getAllincome, createIncome, deleteIncome, UpdateIncome } = require("./controllers/IncomeController");
const { AuthController } = require("./controllers/AuthController");
const app = express();


database();

app.use(express.json());

app.use(cookieParser());
app.use(cors());



app.listen(5000,()=>console.log("Server listen at port 5000"));
//user
app.get("/users",getAllUser);

app.post("/signin",loginUser);

app.post("/signup",registeredUser);






//income
app.get("/income",AuthController,getAllincome);
app.post("/income/create",AuthController,createIncome);
app.delete("/income/delete/:id",AuthController,deleteIncome);
app.post("/income/update/:id",AuthController,UpdateIncome);

//expense

app.get("/expense",findAllExpense);
app.post("/expense",findExpenseByUserId);
app.delete("/expense",deleteExpenseById);
app.post("/expense/add",addExpense);


