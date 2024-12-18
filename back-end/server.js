
const { database } = require("./config/db");
const express = require("express");
const { getAllUser, loginUser, registeredUser, tableUser_expense, taxDeduction, GetInfoByUserId, NotificationBudget, editUser, deleteUser } = require("./controllers/UserController");
const { addExpense, findAllExpense, findExpenseByUserId, deleteExpenseById, UpdateExpense, DeleteMultipleExpense } = require("./controllers/ExpenseController");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { getAllincome, createIncome, deleteIncome, UpdateIncome, createIncomeByUserName, DeleteMultipleIncome } = require("./controllers/IncomeController");
const { AuthController } = require("./controllers/AuthController");
const app = express();


database();

app.use(express.json());

app.use(cookieParser());
app.use(cors());



app.listen(5000, () => console.log("Server listen at port 5000"));
//user
app.get("/users", getAllUser);

app.post("/notification", AuthController, NotificationBudget);

app.post("/signin", loginUser);

app.post("/signup", registeredUser);

app.get("/tableUser_expense", tableUser_expense);

app.post("/taxDeduction", taxDeduction);

app.get("/getInfor/:userID", AuthController, GetInfoByUserId);

app.put("/editUser", AuthController, editUser);

app.delete("/deleteUser",AuthController, deleteUser);
// app.delete("/deleteUser", deleteUser);


//income
app.get("/income", AuthController, getAllincome);

app.post("/income/create", AuthController, createIncome);
app.post("/income/create/:username", AuthController, createIncomeByUserName);
app.delete("/income/:id", AuthController, (req, res, next) => {
    const { id } = req.params;
    if (id === "multi") {
        return next(); 
    }
    deleteIncome(req, res);
});
app.delete("/income/multi",AuthController,DeleteMultipleIncome);
;

app.put("/income", AuthController, UpdateIncome);

//expense

app.get("/expense", AuthController, findAllExpense);
app.post("/expense", AuthController, findExpenseByUserId);
app.put("/expense", AuthController, UpdateExpense);
app.post("/expense/create", AuthController, addExpense);
app.delete("/expense/multi",AuthController,DeleteMultipleExpense);
app.delete("/expense/:id", AuthController, deleteExpenseById);

