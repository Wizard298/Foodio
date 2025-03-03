const express = require('express');
const cors = require('cors');
const signupModel = require('./models/signupMod');


// for jwt authentication
const loginModel = require('./models/loginMod');


// For jwt
const jwt = require('jsonwebtoken');
const secretKey = "secretkey";


// connecting to mongodb
require('./mongodb/connect');


const app = express();
module.exports = app;

// Creating Middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('<h1> Backend has been created successfully for freelancify website! \n Now go to /allLogins </h1>');
})

app.get('/allLogins', async (req, res) => {
    try{
        const limit = parseInt(req.query.limit)
        const storeLogin = await signupModel.find({}).limit(limit)
        res.json({ storeLogin })
    }
    catch(err){
        console.log('The error is', err)
    }
})

// SignUp Process
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await signupModel.findOne({ email });
    if(existingUser){
        if(existingUser.firstName === firstName && existingUser.lastName === lastName && existingUser.password !== password){
            existingUser.password = password; // Update the password
            await existingUser.save();
            res.json({
                message: "password",
            })
        }
        else{
            res.json({
                message: "email",
            })
        }
    }
    else{
        signupModel.create({ firstName, lastName, email, password })
        .then(data => res.json({
            message: "User registered successfully!",
            user: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password 
            }
        }))
        .catch(err => res.json({ error: "Error registering user", details: err }));
    }

});


// Login Process
app.post('/loginCheck', (req, res) => {
    const { email, password } = req.body;

    signupModel.findOne({ email })
    .then(user => {
        console.log(user);
        if (user) {
            if (user.password === password) {
                res.json({
                    message: "Login successfull!",
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
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
});

// Reset Password
app.post('/reset',async (req, res)=>{
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
})



/*-------------------------------------------------------------------------------------*/
// jwt authentication
app.post('/login', (req, res) => {
    const {username, email, password } = req.body;

    loginModel.create({ username, email, password })
    .then(data => {
        jwt.sign({data}, secretKey, { expiresIn: '10000s' }, (err, token)=>{
            res.json({
                token
            })
        })
    })
    .catch(err => res.json({ error: "Error registering user", details: err }));
})
/*
{
    "username": "johnCena",
    "email": "johncena@gmail.com",
    "password": "12345678"
}
*/

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else{
        res.send({
            result: "Token is not valid"
        })
    }
}

app.post('/profile', verifyToken, (req, res)=>{
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.send({result: "Invalid Token"})
        }
        else{
            res.json({
                message: "Profile Accessed",
                authData
            })
        }
    })
})

// Deleting the account
app.delete('/deleteAccount', verifyToken, async (req, res) => {
    const { email } = req.body;
    await signupModel.findOneAndDelete({ email });
    res.json({ message: "Account deleted successfully!" });
});



const port = process.env.PORT || 4500;
app.listen(port, ()=>{
    console.log(`The app listening on port http://localhost:${port}`);
})


// To install jwt
// npm i jsonwebtoken
// const jwt = require('jsonwebtoken');

// In Post
// Go to headers
// go to body ---> raw
// Key ---> Authorization
// Value ---> bearer (copy andd paste token)

// app.post('/login', (req, res) => {
//     const user = {
//         id: 1,
//         username: "johnCena",
//         email: "abc@gmail.com"
//     }

//     jwt.sign({user}, secretKey, { expiresIn: '10000s' }, (err, token)=>{
//         res.json({
//             token
//         })
//     })
// })