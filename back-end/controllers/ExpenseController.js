const { model } = require('mongoose');
const Expense = require('../models/expense');
const User = require('../models/users');
const mongoose = require("mongoose");

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
const UpdateExpense = async (req, res) => {
    // console.log("running update");
    try {
        const { expenseId, category, amount, description, paymentMethod, location, month, year } = req.body
        const result = await Expense.findOne({ _id: expenseId })
        result.category = category;
        result.amount = amount;
        result.description = description;
        result.paymentMethod = paymentMethod,
            result.location = location
        result.updatedAt = new Date();
        result.month = month;
        result.year = year;
        res.status(200).json(result);
        await result.save();
    } catch (err) {
        res.status(500).send({
            message: 'Error editing expense',
            error: err.message,
        });
    }
}

//tìm expense bằng UserId
const findExpenseByUserId = async (req, res) => {
    try {
        const userID = req.body;
        const expenses = await Expense.find({ userID: userID });
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
const deleteExpenseById = async (req, res) => {
    try {
        //func deleteExpenseById, {id}
        const { userID } = req.body;
        console.log("user Id ", userID);
        console.log("param ", req.params.id);
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
        const { username, category, amount, description, paymentMethod, location, month, year } = req.body;
        console.log("Request Body:", req.body);
        let user = await User.findOne({ username: username });
        const newExpense = new Expense({
            user: user._id,
            category: category,
            amount: amount,
            description: description,
            paymentMethod: paymentMethod,
            location: location,
            month: month,
            year: year,
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
const DeleteMultipleExpense = async (req, res) => {
    try {
        console.log("in delete multi expense");
        const { listExpense, userID } = req.body;
        if (!listExpense || !userID) {
            return res.status(400).json({ message: "lack information" });
        }
        const userExist = await User.findOne({ _id: userID }).populate('listExpense.expense');

        if (!userExist) {
            return res.status(404).json({ message: "user not found" });
        }
        for (const expense of listExpense) {
            const expenseId = new mongoose.Types.ObjectId(expense._id);
            await User.updateOne(
                { _id: userID },
                { $pull: { listExpense: { expense: expense._id } } }
            );
            await Expense.deleteOne({ _id: expenseId })
    
        }
        // console.log("after delete: ",userExist.listExpense);
        await userExist.save();
        res.status(200).json(userExist.listExpense);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "delete error", error: error.message });
    }
}


module.exports = { addExpense, findAllExpense, findExpenseByUserId, deleteExpenseById, UpdateExpense, DeleteMultipleExpense }
