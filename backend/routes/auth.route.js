const express = require('express');
const { authAllLogins, authRegister, authLoginCheck, authReset } = require('../controllers/auth.contoller');

const app = express.Router();


app.get('/allLogins', authAllLogins);

app.post('/register', authRegister);

app.post('/loginCheck', authLoginCheck);


app.post('/reset', authReset);


module.exports = app;


/*-------------------------------------------------------------------------------------*/
// jwt authentication
// app.post('/login', (req, res) => {
//     const {username, email, password } = req.body;

//     loginModel.create({ username, email, password })
//     .then(data => {
//         jwt.sign({data}, secretKey, { expiresIn: '10000s' }, (err, token)=>{
//             res.json({
//                 token
//             })
//         })
//     })
//     .catch(err => res.json({ error: "Error registering user", details: err }));
// })
// /*
// {
//     "username": "johnCena",
//     "email": "johncena@gmail.com",
//     "password": "12345678"
// }
// */

// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearer = bearerHeader.split(" ");
//         const token = bearer[1];
//         req.token = token;
//         next();
//     }
//     else{
//         res.send({
//             result: "Token is not valid"
//         })
//     }
// }

// app.post('/profile', verifyToken, (req, res)=>{
//     jwt.verify(req.token, secretKey, (err, authData)=>{
//         if(err){
//             res.send({result: "Invalid Token"})
//         }
//         else{
//             res.json({
//                 message: "Profile Accessed",
//                 authData
//             })
//         }
//     })
// })

// // Deleting the account
// app.delete('/deleteAccount', verifyToken, async (req, res) => {
//     const { email } = req.body;
//     await signupModel.findOneAndDelete({ email });
//     res.json({ message: "Account deleted successfully!" });
// });


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