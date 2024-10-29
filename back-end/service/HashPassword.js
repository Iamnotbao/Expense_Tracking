const bcrypt = require("bcrypt");
// const crypto = require('crypto');

const secret_key = "supanegga"
const salt = 10;
const HashPassword = async (password) => {
    if (password) {
        return new Promise((resolve,reject)=>{
            bcrypt.hash(secret_key, salt, function (err,hash) {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                else{    
                    resolve(hash)
                }
            })

        })
      
    }
    else {
        console.log("Password is empty");

    }

}

// bcrypt.hash(secret_key, salt, function (err, hash) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Your hash value:", hash);
//     }
// })

// Run at first to get access_token
// const accessTokenSecret = crypto.randomBytes(64).toString('hex');
// console.log("Generated Access Token Secret:", accessTokenSecret);

module.exports = { HashPassword };
