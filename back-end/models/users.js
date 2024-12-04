const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    create_at: {
        type: Date,
        default: new Date()
    },
    address: String,
    create_by: String,
    update_at: Date,
    update_by: String,
    role_id: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    },
    expense: {
        type: Number,
        default: 0
    },
    //listHistory: 
    listIncome: [{
        income: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "incomes",
        }
    }],
    listExpense: [{
        expense: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "expenses",
        }
    }]



})
userSchema.post('save', async function (doc, next) {
    try {
        await doc.populate('listIncome.income');
        await doc.populate('listExpense.expense');

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("users", userSchema);
module.exports = User;