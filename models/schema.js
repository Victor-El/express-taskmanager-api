const mongoose = require('mongoose');

const usernameRegex = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required and must be a string."],
        unique: true,
        validate: {
            validator: (v) => Promise.resolve((v.length < 20) && usernameRegex.test(v)),
            message: (p) => `${p.value} is not a valid username`
        }
    },
    email: {
        type: String, 
        unique: true,
        required: [true, "Email is required and must be a string"],
        validate: {
            validator: (v) => Promise.resolve(v.includes("@")),
            message: (prop) => `${prop.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"]
    }
});

const taskSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now()},
    name: {
        type: String,
        required: [true, "Task name is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    }
});

const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Task,
    User
}
