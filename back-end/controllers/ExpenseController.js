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
    try {
        // Tìm người dùng theo tên người dùng
        let user = await User.findOne({ username: "huy" });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Tạo chi tiêu mới
        const newExpense = new Expense({
            userId: user._id,  // Sử dụng ObjectId hợp lệ
            category: 'Food',
            amount: 50,
            description: 'Dinner at restaurant',
            paymentMethod: 'Credit Card',
            location: 'Downtown',
            paymentDate: new Date(),
        });

        // Lưu chi tiêu vào cơ sở dữ liệu và đợi kết quả
        const saveExpense = await newExpense.save();  // Sử dụng await ở đây để đợi kết quả

        // Trả về phản hồi thành công với chi tiêu đã lưu
        return res.status(201).json({
            message: "Expense added successfully",
            expense: saveExpense
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error adding expense",
            error: error.message
        });
    }
};


    module.exports={addExpense,findAllExpense,findExpenseByUserId,deleteExpenseById}
