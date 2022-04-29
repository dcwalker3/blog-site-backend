const jwt = require('jsonwebtoken');

const User = require('../Models/user.model');
const Token = require('../Models/token.model');

require('dotenv').config();
const secret = process.env.TOKEN_SECRET;

function authenticateUser(email, password, Callback){
    // Authenticate user then generate tokens
    User.findOne({email: email}, (err, user) => {
        if(err){
            console.log(err);
            return Callback(err, null);
        }
        if(!user){
            console.log('User not found');
            return Callback({message: 'User not found'}, null);
        }
        if(!user.validatePassword(password)){
            console.log('Password incorrect');
            return Callback({message: 'Invalid password'}, null);
        }else {
            generateToken(user, (err, token) => {
                if(err){
                    console.log(err);
                    return Callback(err, null);
                }
                if(!token){
                    console.log('Error generating token');
                    return Callback({message: 'Error generating token'}, null);
                }
                return Callback(null, token);
            });
        }
    });
}


function refreshToken(refreshToken, Callback){
    // Refresh token
    Token.findOne({refreshToken: refreshToken}, (err, token) => {
        if(err){
            console.log(err);
            return Callback(err, null);
        }
        if(!token){
            return Callback({message: 'Token not found'}, null);
        }
        User.findOne({_id: token.userId}, (err, user) => {
            if(err){
                console.log(err);
                return Callback(err, null);
            }
            if(!user){
                return Callback({message: 'User not found'}, null);
            }
            generateToken(user, (newToken) => {
                if(!newToken){
                    return Callback({message: 'Error generating token'}, null);
                }
                return Callback(null, newToken);
            });
        });
    });
}


function logout(refreshToken, Callback){
    Token.findOneAndDelete({refreshToken: refreshToken}, (err, token) => {
        if(err){
            console.log(err);
            return Callback(false);
        }
        if(!token){
            return Callback({message: 'Token not found'}, null);
        }
        return Callback(true);
    });
}


function authenticateToken(token, Callback){
    if(!token){
        Callback(false);
    }
    Callback(jwt.verify(token, process.env.TOKEN_SECRET));
}

function generateToken(user, Callback){
    if(user && user._id){
        const refreshToken = jwt.sign({id: user._id, email: user.email, role: user.role}, secret);
        const accessToken = jwt.sign({id: user._id, email: user.email, role: user.role}, secret, {expiresIn: '1h'});

        const token = new Token({
            user: user._id,
            refreshToken: refreshToken,
            accessToken: accessToken
        });
        token.save((err, token) => {
            if(err){
                console.log(err);
                return Callback(false);
            }
            return Callback({
                refreshToken: refreshToken,
                accessToken: accessToken,
                expiresIn: 3600
            });
        });
    } else {
        return Callback(false);
    }

}


module.exports = {
    authenticateUser,
    logout,
    refreshToken,
    generateToken,
    authenticateToken
}