module.exports = function registerValidator(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!username) {
        res.status(400).json({
            status: "failure",
            message: "username is required"
        });
    }

    if (!email) {
        res.status(400).json({
            status: "failure",
            message: "email is required"
        });
    }

    if (!password) {
        res.status(400).json({
            status: "failure",
            message: "password is required"
        });
    }

    if (!firstname) {
        res.status(400).json({
            status: "failure",
            message: "firstname is required"
        });
    }

    if (!lastname) {
        res.status(400).json({
            status: "failure",
            message: "lastname is required"
        });
    }

    next();
}