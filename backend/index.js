const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Order = require('./models/orderMod');

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
const webhookRoute = require('./routes/webhook.route');
const itemRoute = require('./routes/items.route');


const app = express();
module.exports = app;


// ✅ CORS Configuration (Allow Frontend Access)
// app.use(cors());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://foodio11.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

// Creating Middleware
app.use(express.json());
  

app.get('/', (req, res) => {
    res.send('<h1> Backend has been created successfully for freelancify website! \n Now go to /allLogins </h1>');
})


// Routes
app.use('/', authRoute);
app.use('/payment', paymentRoute);
app.use('/webhook', webhookRoute);
app.use('/', itemRoute); // add food item dynamically


app.get('/admin/orders', async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

// to change the status from admin to user
app.put('/admin/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update status' });
    }
});


app.get('/my-orders/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error('Failed to fetch user orders:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/my-orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});





const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log(`The app listening on port http://localhost:${port}`);
})