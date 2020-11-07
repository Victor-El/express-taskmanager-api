const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../constants');

module.exports = function jwtValidator(req, res, next) {
    const token = req.header("token");

    if (!token) {
        res.status(400).json({
            status: "failure",
            message: "token header required"
        });
    }

    if (token) {
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (!err) {
                next();
            } else {
                res.status(400).json({
                    status: "failure",
                    message: "invalid token"
                });
            }
        });
    }
}