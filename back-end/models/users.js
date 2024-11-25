const mongoose = require("mongoose");
const Expense = require("./expense");


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
    notification: {
        type: Boolean, // Định nghĩa kiểu dữ liệu Boolean
        default: true   // Mặc định là true nếu không có giá trị nào được cung cấp
    },
    balance: Number,
    income: Number,
    //listHistory: 
    listIncome: [{
        income: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "incomes",
            required: true
        }
    }],
    //list expense
    listExpense: [{
            expense: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "expense",
                required: true
            }
        }]
})
userSchema.post('save', async function (doc, next) {
    try {
        await doc.populate('listIncome.income');
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("users", userSchema);
module.exports = User;