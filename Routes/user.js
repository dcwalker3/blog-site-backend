const express = require('express');
const { authenticateToken } = require('../Route-Functions/Auth.js');
const router = express.Router();

const userFunctions = require('../Route-Functions/User.js');

router.post('/', (req, res) => {
    userFunctions.addUser(req.body.email, req.body.password, (result) => {
        if(result === true){
            res.send({
                success: true,
                message: 'User added successfully'
            });
        } else {
            res.send({
                success: false,
                message: result
            });
        }
    });   
});

router.get('/:email', (req, res) => {
    const token = req.headers.authorization;
    
    authenticateToken(token, (result) => {
        if(result === false){
            res.send({
                success: false,
                message: 'Invalid token'
            });
        } else {
            if(result.role !== 'admin'){
                res.send({
                    success: false,
                    message: 'You are not authorized to perform this action'
                });
            } else {
                userFunctions.getUser(req.params.email)
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        res.status(500).json("Unable to get user");
                    });
            }
        }
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

router





module.exports = router;