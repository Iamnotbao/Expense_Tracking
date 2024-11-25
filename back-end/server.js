
const { database } = require("./config/db");
const express = require("express");
const session = require("express-session");
const { getAllUser, loginUser, registeredUser } = require("./controllers/UserController");
const { addExpense, findAllExpense, findExpenseByUserId, deleteExpenseById } = require("./controllers/ExpenseController");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { getAllincome, createIncome } = require("./controllers/IncomeController");
const app = express();


database();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',  // React app URL
  credentials: true,  // Allow sending cookies/credentials
}));

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false ,
            httpOnly: true,
        }
    })
);
app.listen(5000, () => console.log("Server listen at port 5000"));
//user
app.get("/users", getAllUser);

app.post("/signin", loginUser);

app.post("/signup", registeredUser);


// expense part

//add expense
app.post("/expense/addExpense", addExpense);

//get expenses by User Id
app.get('/expense/:id', findExpenseByUserId);
//get all expenses
app.get("/expense", findAllExpense);

//income
app.get("/income", getAllincome);
app.post("/income/create", createIncome);

//getSession
app.get('/profile', (req, res) => {
  if (req.session) {
    console.log('User session:', req.session);
    res.json({
      success: true,
      session: req.session,
    });
  } else {
    console.log('No user session');
    res.status(401).json({
      success: false,
      session: req.session,
      message: 'User not logged in',
    });
  }
});






