const signupModel = require('../models/signupMod')
// const loginModel = require('../models/loginMod')


// get all logins details
const authAllLogins = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const storeLogin = await signupModel.find({}).limit(limit)
        res.json({ storeLogin })
    }
    catch (err) {
        console.log('The error is', err)
    }
}

// register
const authRegister = async (req, res) => {
    // const { firstName, lastName, email, password } = req.body;
    const { username, email, password } = req.body;

    const existingUser = await signupModel.findOne({ email });
    if (existingUser) {
        // if (existingUser.firstName === firstName && existingUser.lastName === lastName && existingUser.password !== password) {
        if (existingUser.username === username && existingUser.password !== password) {
            existingUser.password = password; // Update the password
            await existingUser.save();
            res.json({
                message: "password",
            })
        }
        else {
            res.json({
                message: "email",
            })
        }
    }
    else {
        // signupModel.create({ firstName, lastName, email, password })
        signupModel.create({ username, email, password })
            .then(data => res.json({
                message: "User registered successfully!",
                user: {
                    // firstName: data.firstName,
                    // lastName: data.lastName,
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            }))
            .catch(err => res.json({ error: "Error registering user", details: err }));
    }
}

// 
const authLoginCheck = async (req, res) => {
    const { email, password } = req.body;

    signupModel.findOne({ email })
        .then(user => {
            console.log(user);
            if (user) {
                if (user.password === password) {
                    res.json({
                        message: "Login successfull!",
                        user: {
                            // firstName: user.firstName,
                            // lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            password: user.password
                        }
                    });
                } else {
                    res.json({ message: "password incorrect" });
                }
            } else {
                res.json({ message: "No record found!" });
            }
        })
        .catch(err => res.json({ error: "An error occurred", details: err }));
}


const authReset = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await signupModel.findOne({ email });
    if(existingUser){
        if(existingUser.password !== password){
            existingUser.password = password; 
            await existingUser.save();
            res.json({
                message: "password",
            })
        }
        else{
            res.json({
                message: "same",
            })
        }
    }
    else{
        res.json({
            message: "email",
        })
    }
}


module.exports = {
    authAllLogins,
    authRegister,
    authLoginCheck,
    authReset,
}