const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    }
}, {timestamps: true});


userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.passwordHash === hash;
}

const User = mongoose.model('User', userSchema);
module.exports = User;