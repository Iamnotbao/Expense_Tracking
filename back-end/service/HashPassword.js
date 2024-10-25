const bcrypt = require("bcrypt");
const crypto = require('crypto');

const secret_key = "supanegga"
const salt=10;

bcrypt.hash(secret_key,salt,function(err,hash){
    if(err){
        console.log(err);
    }
    else{
        console.log("Your hash value:", hash);
    }
})



// Generate a random 64-byte hex string
const accessTokenSecret = crypto.randomBytes(64).toString('hex');

// Log the generated token
console.log("Generated Access Token Secret:", accessTokenSecret);

// You can save this to your .env file as needed