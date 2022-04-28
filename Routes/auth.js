const express = require('express');
const router = express.Router();

const authFunctions = require('../Route-Functions/Auth.js');

router.post('/', (req, res) => {
    authFunctions.authenticateUser(req.body.email, req.body.password, (result) => {
        if(result){
            authFunctions.generateToken(result._id ,result.email, result.role, (token) => {
                console.log(token.email, token.role);
                res.status(200).json({
                    success: true,
                    message: 'User Authenticated',
                    token: token
                });
            });
        } else {
            res.status(500).json({
                success: false,
                message: result
            });
        }
    });
});


module.exports = router;