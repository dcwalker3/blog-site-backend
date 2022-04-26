const express = require('express');
const router = express.Router();

const postFunction = require('../Route-Functions/Post.js');

router.get('/', (req, res) => {
    postFunction.getAllPosts(posts => {
        if(posts){
            res.status(200).json(posts);
        }
        else{
            console.log(err);
            res.status(500).json("Unable to get posts");
        };
    });
});

router.get('/:id', (req, res) => {
    postFunction.getPost(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json("Unable to get post");
        });
});


router.post('/', (req, res) => {
    postFunction.addPost(req.body.post)
        .then(post => {
            res.status(200).json("post added");
        })
        .catch(err => {
            res.status(500).send("unable to add post");
        });
});


router.delete('/:id', (req, res) => {
    postFunction.deletePost(req.params.id)
        .then(post => {
            res.status(200).json("post deleted");
        })
        .catch(err => {
            res.status(500).json("unable to delete post");
        });
});

router.put("/:id", (req, res) => {
    postFunction.updatePost(req.params.id, req.body.post)
        .then(post => {
            res.status(200).json("post updated");
        })
        .catch(err => {
            res.status(500).json("unable to update post");
        })
});
    

module.exports = router;