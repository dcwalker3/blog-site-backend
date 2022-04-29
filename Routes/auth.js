const express = require('express');
const router = express.Router();

const authFunctions = require('../Route-Functions/Auth.js');

router.post('/login', (req, res) => {
    authFunctions.authenticateUser(req.body.email, req.body.password, (result) => {
        if(result){
            authFunctions.generateToken(result, (token) => {
                if(token){
                    res.json({
                        success: true,
                        refreshToken: token.refreshToken,
                        accessToken: token.accessToken,
                        expiresIn: token.expiresIn
                    });
                } else {
                    res.json({message: 'Error generating token'});
                }
            })
        }
    });
});


module.exports = router;