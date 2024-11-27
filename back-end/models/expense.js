const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId,
        ref :"users",
        require: true,
    },
    category: String,
    amount: Number,
    description: String,
    paymentMethod: String,
    location: String,
    paymentDate: { type: Date, default: new Date() }
}, { timestamps: true });
const Expense=mongoose.model('expense',expenseSchema);
module.exports =Expense;