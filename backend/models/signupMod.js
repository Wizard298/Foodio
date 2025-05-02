const mongoose = require('mongoose');

const makeSignUpSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const signupModel = mongoose.model("signUps", makeSignUpSchema);
module.exports = signupModel;