// routes/payment.route.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Secret Key from Stripe
const app = express.Router();

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.name,
        images: [item.img], // optional
      },
      unit_amount: item.price * 100, // Stripe uses paisa (₹1 = 100)
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // after payment
      cancel_url: 'http://localhost:3000/cancel',   // if cancelled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Stripe session');
  }
});

module.exports = app;
