const bcrypt = require("bcrypt");
// const crypto = require('crypto');

const secret_key = "supanegga"
const salt = 10;
const HashPassword = async (password) => {
    if (password) {
        return new Promise((resolve,reject)=>{
            bcrypt.hash(password, salt, function (err,hash) {
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
const ComparedPassword = async(password,user_password)=>{
    //console.log(password,user_password);
    
    if (password) {
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password, user_password, function (err,compare) {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                else{    
                    resolve(compare)
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

module.exports = { HashPassword,ComparedPassword };
