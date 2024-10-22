
const {database} = require("./config/db");
const express = require("express");
const { getAllUser } = require("./controllers/UserController");
const app = express();


database();



app.listen(5000,()=>console.log("Server listen at port 5000"));

app.get("/users",getAllUser);





