const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/schema');


function RegisterService() {
    this.register = async function(data, callback) {
        console.log("Register Service Called");

        const username = data.username;
        const email = data.email;
        const password = await bcrypt.hash(data.password, 10);
        const firstname = data.firstname;
        const lastname = data.lastname;

        if (username && email && password && firstname && lastname) {
            const user = new User({username, email, password, firstname, lastname});
            user.save((err, doc) => {
                if (err) {
                    callback(err, null);
                } else {
                    console.log(doc);
                    callback(null, doc);
                }
            
            });

        } else {
            callback("one or more invalid parameters", null);
        }

    };
}

function LoginService() {
    this.login = function(data, callback) {
        const username = data.username;
        const email = data.password;
        const password = data.password;

        if (!(username || email)) {
            callback("must login with either username or password", null);
        } else {
            if (username) {
                user = User.findOne({username}, (err, doc) => {
                    if (!err) {
                        bcrypt.compare(password, doc.password, (err, same) => {
                            if (!err) {
                                if (same) {
                                    console.log("Logged in user", doc);
                                    callback(null, doc);
                                } else {
                                    callback("username or email and password didn't match", null);
                                }
                            } else {
                                callback(err, null);
                            }
                        });
                    } else {
                        callback(err, null);
                    }
                });
            } else {
                user = User.findOne({email}, (err, doc) => {});
            }
            
            
        }
    };
}


const registerService = new RegisterService();
const loginService = new LoginService();
module.exports = {
    registerService,
    loginService
}

