const mongoose = require('mongoose');

// created fro jwt authentication
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    }
})

const loginModel = mongoose.model("logins", loginSchema);
module.exports = loginModel;