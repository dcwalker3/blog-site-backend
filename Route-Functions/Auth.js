const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

require('dotenv').config();

function authenticateUser(email, password, Callback){
    User.findOne({email: email})
        .then(user => {
            if(!user){
                Callback("User not found");
            } else if(!user.validatePassword(password)){
                Callback("Incorrect password");
            } else {
                Callback(user);
            }
        })
        .catch(err => {
            console.log(err);
            Callback("Unable to authenticate user");
        });
}

function generateRefreshToken(id, email, role, Callback){
    Callback(jwt.sign({id: id, email: email, role: role}, process.env.REFRESH_TOKEN_SECRET));
}

function authenticateToken(token, Callback){
    if(!token){
        Callback(false);
    }
    Callback(jwt.verify(token, process.env.TOKEN_SECRET));
}

function generateAccessToken(id, email, role, Callback){
    Callback(jwt.sign({id: id, email: email, role: role}, process.env.ACCESS_TOKEN_SECRET), {expiresIn: '1h'});
}





module.exports = {
    authenticateUser,
    generateToken,
    authenticateToken
}