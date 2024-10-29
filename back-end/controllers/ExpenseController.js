const { model } = require('mongoose');
const Expense = require('../models/expense');
const User= require('../models/users');
// lấy tất cả expense
const findAllExpense = async (req, res) => {
    let expenses;
    expenses = Expense.find({}).then(expenses => {
        console.log(expenses);
        res.json(expenses);
    }).catch(error => {
        console.log(error);
    });
    console.log(expenses);
}

//tìm expense bằng UserId
async function findExpenseByUserId(req,res) {
    try {
        const userId = req.params.id;
        const expenses = await Expense.find({ userId:  userId });
        if (expenses.length > 0) {
            console.log('Expenses found:', expenses);
            res.json(expenses);
        } else {
            console.log('No expenses found for this user');
            res.status(404).json({ message: 'No expenses found for this user' });
        }
    } catch (error) {
        console.error('Error finding expense:', error);
    }
}
    //xóa expense bằng ID
    // chưa test thử
async function deleteExpenseById(req,res) {
    try {
        const ID= req.params.ID;
        const result = await Expense.deleteOne({ _id: ID })
        if (result) {
            console.log("deleted");
        } else {
            console.log("not found");
        }
    } catch (error) {
        console.log(error);
    }
}
// thêm expense
const addExpense = async (req, res) => {
    let expense = Expense;
    //đây là demo add
    let user= await User.findOne({username : "huy"});
    const newExpense = new Expense({
        userId: user._id,
        category: 'Food',
        amount: 50,
        description: 'Dinner at restaurant',
        paymentMethod: 'Credit Card',
        recurring: false,
        location: 'Downtown',
        paymentDate: new Date()
    });
    try {
        const saveExpense = newExpense.save();
    } catch (error) {
        console.log(error);
    }
}
    module.exports={addExpense,findAllExpense,findExpenseByUserId,deleteExpenseById}
