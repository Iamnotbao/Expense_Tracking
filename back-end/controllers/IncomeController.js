const User = require("../models/users.js");
const Income = require("../models/income.js")


const getAllincome = async (req, res) => {
    const income = await Income.find({}).exec()
    try {
        if (income) {
            return res.status(200).json({
                message: true,
                income
            })
        }
        return res.status(404).json({
            message: false
        })
    } catch (error) {
        console.log(err);

    }



}
const createIncome = async (req, res) => {
    const { user, nameIncome, amount } = req.body;

    const userExist = await User.find({ _id: user });
        console.log(userExist);

    const incomes = new Income({
        nameIncome: nameIncome,
        amount: amount,
        user: user
    })
    await  incomes.save();


   userExist.listIncome.push({ income: incomes._id });
    
    

}



module.exports = { getAllincome, createIncome }
