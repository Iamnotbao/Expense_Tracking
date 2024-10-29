
const {database} = require("./config/db");
const express = require("express");
const { getAllUser, loginUser, registeredUser } = require("./controllers/UserController");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { getAllincome, createIncome } = require("./controllers/IncomeController");
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
app.get("/income",getAllincome);
app.post("/income/create",createIncome);




