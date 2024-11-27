const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    nameIncome: String,
    amount: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        require: true,
    }

})

const Income = mongoose.model("incomes", IncomeSchema);
module.exports = Income;