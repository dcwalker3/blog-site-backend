const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
