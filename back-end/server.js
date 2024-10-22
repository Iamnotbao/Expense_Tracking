
const {database} = require("./config/db");
const express = require("express")
const app = express();


database();



app.listen(5000,()=>console.log("Server listen at port 5000"));





