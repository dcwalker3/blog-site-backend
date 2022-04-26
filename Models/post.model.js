const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;