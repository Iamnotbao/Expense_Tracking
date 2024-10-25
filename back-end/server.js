
const {database} = require("./config/db");
const express = require("express");
const { getAllUser, loginUser } = require("./controllers/UserController");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();


database();

app.use(express.json());

app.use(cookieParser());
app.use(cors());



app.listen(5000,()=>console.log("Server listen at port 5000"));

app.get("/users",getAllUser);

app.post("/signin",loginUser)





