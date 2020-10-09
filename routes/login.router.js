const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { loginService } = require('../services/auth.service');

const { JWT_PRIVATE_KEY } = require("../constants");


router.post("/", (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!(username || email)) {
        res.status(400).json({
            status: "failure",
            message: "username or email is required",
        });
    } else {
        if (username && password) {
            loginService.login({username, password}, (err, doc) => {
                if (!err) {
                    res.json({
                        status: "success",
                        message: "signed in successfully",
                        token: jwt.sign({id: doc._id}, JWT_PRIVATE_KEY, {expiresIn: 7 * 24 * 60 * 60}),
                        doc
                    });
                } else {
                    res.status(500).json({
                        status: "failure",
                        error: err
                    });
                }
            });
        } else {
            loginService.login({email, password}, (err, doc) => {
                if (!err) {
                    res.json({
                        status: "success",
                        message: "signed in successfully",
                        token: jwt.sign({id: doc._id}, JWT_PRIVATE_KEY, {expiresIn: 7 * 24 * 60 * 60}),
                        doc
                    });
                } else {
                    res.status(500).json({
                        status: "failure",
                        error: err
                    });
                }
            });
        }
    }
    
});

module.exports = router;