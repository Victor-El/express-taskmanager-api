const express = require('express');
const { registerService } = require('../services/auth.service');

const router = express.Router();


router.post("/", (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (username && password && email && firstname && lastname) {
        registerService.register({
            username,
            password,
            email,
            firstname,
            lastname
        }, (err, user) => {
            if (!err) {
                delete user.password;
                res.json({
                    status: "success",
                    message: "User created",
                    user
                });
            } else {
                res.status(500).json({
                    status: "failure",
                    message: "User not created",
                    error: err
                });
            }
        });
    }

});


module.exports = router;