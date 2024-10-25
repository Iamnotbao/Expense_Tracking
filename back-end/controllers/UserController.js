
const User = require("../models/users.js")

const getAllUser = async (req, res) => {
  let user;
  try {
    user = await User.find({}).exec()
    if (user) {
      return res.status(200).json({
        message: true,
        user
      })
    } else {
      console.log(" user not data");

    }


  } catch (error) {
    res.status(401).json({
      message: false,
    })
  }

}

const loginUser = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const user = await User.find({ username: username });
  if (user) {
    return res.status(401).json({
      success: false,
      errorCode: 100,
      message: "This user is already exist!"
    })
  }
}
module.exports = {
  getAllUser,
  loginUser
}
