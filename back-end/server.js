
const {database} = require("./config/db");
const express = require("express");
const { getAllUser, loginUser, registeredUser } = require("./controllers/UserController");
const {addExpense,findAllExpense,findExpenseByUserId,deleteExpenseById} =require("./controllers/ExpenseController");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();


database();

app.use(express.json());

app.use(cookieParser());
app.use(cors());



app.listen(5000,()=>console.log("Server listen at port 5000"));

app.get("/users",getAllUser);

app.post("/signin",loginUser);

app.post("/signup",registeredUser);


// expense part
//get all expenses
app.get("/expense",findAllExpense);
//get expenses by User Id
app.get('/expense/:id',findExpenseByUserId);
//add expense
app.post("/expense/add",addExpense);






