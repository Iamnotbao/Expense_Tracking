const User = require("../models/users.js");
const Income = require("../models/incomes.js")
const mongoose = require("mongoose");

const getAllincome = async (req, res) => {
    const income = await Income.find({}).populate('user').exec();
    try {
        if (income) {
            return res.status(200).json({
                success: true,
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
    const { userID, nameIncome, amount, month, year } = req.body;

    const userExist = await User.findOne({ _id: userID });

    if (!userExist) {
        return;
    }
    console.log(userExist);
    const incomes = new Income({
        nameIncome: nameIncome,
        amount: amount,
        month: month,
        Year: year,
        user: userID
    })
    console.log("checking income", incomes);

    await incomes.save();
    console.log(userExist.listIncome);


    userExist.listIncome.push({ income: incomes._id });
    await userExist.save();
    res.json(userExist)
}

const createIncomeByUserName = async (req, res) => {
    const { userName, nameIncome, amount } = req.body;

    const userExist = await User.findOne({ username: userName });
    if (!userExist) {
        return;
    }
    console.log(userExist);

    const incomes = new Income({
        nameIncome: nameIncome,
        amount: amount,
        user: userExist._id,
    })

    await incomes.save();
    console.log("Create", userExist.listIncome);


    userExist.listIncome.push({ income: incomes._id });
    await userExist.save();
    res.json(userExist)
}

const deleteIncome = async (req, res) => {
    console.log("ok");
    //func deleteIncome, {id}
    const { userID } = req.body;
    const userExist = await User.findOne({ _id: userID });

    const newlist = [];

    const result = userExist.listIncome.forEach(async (item) => {
        if (!(item.income.equals(req.params.id))) {
            newlist.push(item);
        }
        else {
            const response = await Income.deleteOne({ _id: req.params.id })
            if (response.data) {
                console.log("ok");
            } else {
                console.log("no");
            }
        }

    });

    userExist.listIncome = newlist;

   await userExist.save();
    return res.status(200).json(userExist.listIncome);
}

const DeleteMultipleIncome = async (req, res) => {

    const { listIncome, userID } = req.boby

    const userExist = await User.findOne({ _id: userID });

    for (const income of listIncome) {

        userExist.listIncome.deleteOne({ _id: income._id });
        const response = await Income.deleteOne({ _id: income._id })

    }

    await userExist.save();

}

const UpdateIncome = async (req, res) => {

    const { idIncome, nameIncome, amount } = req.body;
    console.log(idIncome);
    // Print values to console
    console.log('idIncome:', idIncome);
    console.log('nameIncome:', nameIncome);
    console.log('amount:', amount);

    //const user = await User.findOne({ _id: userID });

    const result = await Income.findOne({ _id: idIncome })
    if (!result) {
        // If no document is found, return a 404 response
        console.log(`Income record with ID ${idIncome} not found.`);
        return res.status(404).json({ error: 'Income record not found' });
    }
    result.nameIncome = nameIncome;
    result.amount = amount;

    if (result) {
        console.log("ok");
    }
    else {
        console.log("not");
    }

   
    await result.save();
    return res.json(result);
};


module.exports = { getAllincome, createIncome, deleteIncome, UpdateIncome, createIncomeByUserName, }
