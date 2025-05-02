const express = require('express');
const cors = require('cors');
require('dotenv').config();

// for jwt authentication
// const loginModel = require('./models/loginMod');


// For jwt
// const jwt = require('jsonwebtoken');
// const secretKey = "secretkey";


// connecting to mongodb
require('./mongodb/connect');


// importing routes
const authRoute = require('./routes/auth.route')
const paymentRoute = require('./routes/payment.route');


const app = express();
module.exports = app;

// Creating Middleware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('<h1> Backend has been created successfully for freelancify website! \n Now go to /allLogins </h1>');
})


// Routes
app.use('/', authRoute);
app.use('/payment', paymentRoute);



const port = process.env.PORT || 4500;
app.listen(port, ()=>{
    console.log(`The app listening on port http://localhost:${port}`);
})