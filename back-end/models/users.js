const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:String,
    password:String, 
    email:String,
    phone:Number,
    create_at:{
        type:Date,
        default:new Date()
    },
    address:String,
    create_by:String,
    update_at:Date,
    update_by:String,
    role_id:{
        type:Number,
        default:0
    },
    balance: Number,
    //listHistory: 
    listIncome: [{
        income: {
            type:mongoose.Schema.ObjectId,
            ref :"incomes",
            require: true,
        }

    }]
    ,

})

const User = mongoose.model("users", userSchema);
module.exports = User;