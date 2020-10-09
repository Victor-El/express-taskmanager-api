module.exports = function(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if (!(email || username)) {
        res.status(400).json({
            status: "failure",
            message: "username or email is required",
        });
    }

    if (!password) {
        res.status(400).json({
            status: "failure",
            message: "password is required"
        });
    }

    next();
}