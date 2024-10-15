
const {database} = require("./config/db");
const express = require("express")
const app = express();


database();

let port = process.env.PORT;

app.listen(port,()=>console.log(`Server listen at port ${port}`));