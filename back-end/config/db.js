const mongoose = require("mongoose");

 const database =()=>{
    const connectionString = "mongodb+srv://baolecit20:3hjvI4VG0hxoSxti@cluster0.lsow4.mongodb.net/?retryWrites=true&w=majority"
    try {
        mongoose.connect(`${connectionString}`)
        console.log("Connect successfully!!!");
    } catch (error) { console.log("fail.", error) };
}
module.exports={database}

