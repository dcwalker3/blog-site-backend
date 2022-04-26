const Post = require('../Models/post.model');

function addPost(post){
    const newPost = new Post({
        title: post.title,
        body: post.body,
        author: post.author,
    });

    newPost.save((err, post) => {
        if(err){
            console.log(err);
            return Promise.reject(err);
        }
        return Promise.resolve(post);
    });
}

function getAllPosts(callback){
    Post.find({}, (err, posts) => {
        if(err){
            console.log(err);
            callback(false);
        }
        else {
            if(posts){
                callback(posts);
            } else {
                callback(false);
            }
        }
    });
}


function getPost (id){
    return Post.findById(id)
    .then(post => {
        if(!post){
            return Promise.reject('Post not found');
        }
        return Promise.resolve(post);
    });
}


function updatePost(id, postBody){
    Post.findByIdAndUpdate(id, {body: postBody}, {new: true}, (err, post) => {
        if(err){
            console.log(err);
            return Promise.reject(err);
        }
        return Promise.resolve(post);
    });
}


function deletePost(id){
    return Post.findByIdAndRemove(id, (err, post) => {
        if(err){
            console.log(err);
            return Promise.reject(err);
        }
        return Promise.resolve(post);
    });
}
    

module.exports = {
    addPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};