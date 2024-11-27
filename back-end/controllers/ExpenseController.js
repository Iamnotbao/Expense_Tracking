const { model } = require('mongoose');
const Expense = require('../models/expense');
const User = require('../models/users');
// lấy tất cả expense
const findAllExpense = async (req, res) => {
    let expenses;
    expenses = Expense.find({}).populate('user').then(expenses => {
        // console.log(expenses);
        res.json(expenses);
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            message: 'Error retrieving expenses',
            error: error.message
        });
    });
    //console.log(expenses);
}
//
const UpdateExpense=async (req, res)=>{
    try {
        const { expenseId, category, amount, description, paymentMethod, location } = req.body
        const result = await Expense.findOne({ _id: expenseId })
        result.category = category;
        result.amount = amount;
        result.description = description;
        result.paymentMethod = paymentMethod,
            result.location = location
        result.updatedAt = new Date();
        res.json(result);
        await result.save();
    } catch (err) {
        res.status(500).send({
            message: 'Error editing expense',
            error: err.message,
        });
    }
}

//tìm expense bằng UserId
const findExpenseByUserId= async (req, res)=> {
    try {
        const user = req.params.id;
        const expenses = await Expense.find({ userId: userId });
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
const deleteExpenseById = async (req, res) =>{
    try {
        //func deleteExpenseById, {id}
        const { userID } = req.body;
        const userExist = await User.findOne({ _id: userID });
        if (!userExist) {
            return res.status(404).send({ message: "User not found" });
        }
        const newlist = [];
       
        const result = userExist.listExpense.forEach(async (item) => {
            if (!(item.expense.equals(req.params.id))) {
                newlist.push(item);
            }
            else {
                const response = await Expense.deleteOne({ _id: req.params.id })
                if (response.data) {
                    console.log("ok");
                } else {
                    console.log("no");
                }
            }
        });

        userExist.listExpense = newlist;
        res.json(userExist);
        await userExist.save();
        console.log("expense delete successfully");
      
        
    } catch (err) {
        res.status(500).send({
            message: 'Error delete expense',
            error: err.message
        });
    }
}
// thêm expense
const addExpense = async (req, res) => {
    //đây là demo add
    try {
        const { username, category, amount, description, paymentMethod, location } = req.body;
       
        let user = await User.findOne({ username: username });
        const newExpense = new Expense({
            user: user._id,
            category: category,
            amount: amount,
            description: description,
            paymentMethod: paymentMethod,
            location: location,
            paymentDate: new Date()
        });

        const saveExpense = newExpense.save();
        user.listExpense.push({ expense: newExpense._id });
        await user.save();

        return res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error adding expense',
            error: error.message
        });
    }
}
module.exports = { addExpense, findAllExpense, findExpenseByUserId, deleteExpenseById, UpdateExpense }
