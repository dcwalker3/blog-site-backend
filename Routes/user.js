const express = require('express');
const router = express.Router();

const userFunctions = require('../Route-Functions/User.js');

router.post('/', (req, res) => {
    userFunctions.addUser(req.body.user)
        .then(user => {
            res.status(200).json("user added");
        })
        .catch(err => {
            res.status(500).send("unable to add user");
        });
});

router.get('/:email', (req, res) => {
    userFunctions.getUser(req.params.email)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json("Unable to get user");
        });
});


router.put('/:id', (req, res) => {
    userFunctions.changePassword(req.params.id, req.body.password)
        .then(user => {
            res.status(200).json("user password changed");
        })
        .catch(err => {
            res.status(500).json("unable to change user password");
        });
});





module.exports = router;