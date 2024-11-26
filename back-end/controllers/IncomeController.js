const User = require("../models/users.js");
const Income = require("../models/incomes.js")


const getAllincome = async (req, res) => {
    const income = await Income.find({}).populate('user').exec();
    try {
        if (income) {
            return res.status(200).json({
                success:true,
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

    const userExist = await User.findOne({ _id: user });
    console.log(userExist);

    const incomes = new Income({
        nameIncome: nameIncome,
        amount: amount,
        user: user
    })

    await incomes.save();
    console.log(userExist.listIncome);


    userExist.listIncome.push({ income: incomes._id });
    await userExist.save();
    res.json(userExist)
}
const deleteIncome = async (req, res) =>  {
    //func deleteIncome, {id}
    const {userID , idIncome} =  req.body;
    const userExist = await User.findOne({ _id: userID });

    const newlist =[];

    const result = userExist.listIncome.forEach((item)=>{
                if(!(item.income.equals(idIncome))){
                    newlist.push(item);  
                }

    });

    userExist.listIncome = newlist;
    
    res.json(userExist.listIncome);
    
     await userExist.save();
}



const Update = async (req, res) =>{

  const {userID } =  req.body;
  const { username, password, email, phone, address } = req.body;
  const user = await User.findOne({ _id: userID });

}


module.exports = { getAllincome, createIncome, deleteIncome}
