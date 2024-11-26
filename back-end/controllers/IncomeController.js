const User = require("../models/users.js");
const Income = require("../models/incomes.js")


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
    const { userID, nameIncome, amount } = req.body;

    const userExist = await User.findOne({ _id: userID });
    console.log(userExist);

    const incomes = new Income({
        nameIncome: nameIncome,
        amount: amount,
        user: userID
    })

    await incomes.save();
    console.log(userExist.listIncome);


    userExist.listIncome.push({ income: incomes._id });
    await userExist.save();
    res.json(userExist)
}
const deleteIncome = async (req, res) => {
    //func deleteIncome, {id}
    const { userID, idIncome } = req.body;
    const userExist = await User.findOne({ _id: userID });

    const newlist = [];

    const result = userExist.listIncome.forEach( async(item) => {
        if (!(item.income.equals(idIncome))) {
           newlist.push(item);
        }
        else{
           const response = await Income.deleteOne({_id:idIncome})
           if(response.data){
            console.log("ok");
            
           }else{
            console.log("no");
           }  
        }

    });

    userExist.listIncome = newlist;

    res.json(userExist.listIncome);

    await userExist.save();
}



const UpdateIncome = async (req, res) => {

    const { idIncome ,nameIncome, amount} = req.body;

    //const user = await User.findOne({ _id: userID });

    const result = await Income.findOne({_id:idIncome})

    result.nameIncome = nameIncome;
    result.amount = amount;
    
    if (result) {
        console.log("ok");
    }
    else {
        console.log("not");
    }

    res.json(result);
    await result.save();
};


module.exports = { getAllincome, createIncome, deleteIncome, UpdateIncome }
