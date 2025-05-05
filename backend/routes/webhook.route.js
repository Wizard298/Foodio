const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key');
const bodyParser = require('body-parser');

// To read raw body for Stripe signature verification
router.post('/stripe', bodyParser.raw({ type: 'application/json' }), async (req, res) => {

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // from Stripe dashboard
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.sendStatus(400);
    }

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Extract custom metadata if you sent it (you can also fetch line items using the session ID)
        const customerEmail = session.customer_details.email;

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            limit: 100,
        });

        // Save order in your database (example using Mongoose)
        const Order = require('../models/order.model');
        const newOrder = new Order({
            email: customerEmail,
            items: lineItems.data.map(item => ({
                name: item.description,
                quantity: item.quantity,
                price: item.amount_total / 100,
            })),
            totalAmount: session.amount_total / 100,
            createdAt: new Date(),
        });

        await newOrder.save();
    }

    res.sendStatus(200);
});

module.exports = router;
