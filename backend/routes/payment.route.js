// routes/payment.route.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Secret Key from Stripe
const app = express.Router();
const Order = require('../models/orderMod')

// app.post('/create-checkout-session', async (req, res) => {
//   const { cartItems } = req.body;

//   const line_items = cartItems.map(item => ({
//     price_data: {
//       currency: 'inr',
//       product_data: {
//         name: item.name,
//         images: [item.img], // optional
//       },
//       unit_amount: item.price * 100, // Stripe uses paisa (₹1 = 100)
//     },
//     quantity: item.quantity,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success', // after payment
//       cancel_url: 'http://localhost:3000/cancel',   // if cancelled
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error creating Stripe session');
//   }
// });

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems, email, totalAmount } = req.body;

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.name,
        images: [item.img],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));


  try {
    // 🔍 Check if an order exists for the email and is still in 'placed' status
    let existingOrder = await Order.findOne({ userEmail: email, status: "placed" });

    if (existingOrder) {
      // ✅ Merge the cart items and update totalAmount
      // existingOrder.cartItems.push(...cartItems);
      cartItems.forEach(newItem => {
        const existingItem = existingOrder.cartItems.find(
          item => item.name === newItem.name // or use a unique `item._id` if available
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          existingOrder.cartItems.push(newItem);
        }
      });
      
      existingOrder.totalAmount += totalAmount;
      await existingOrder.save();
    } else {
      // ✅ Create a new order
      existingOrder = new Order({
        userEmail: email,
        cartItems,
        totalAmount,
        status: "placed",
      });
      await existingOrder.save();
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email,
      metadata: {
        orderId: newOrder._id.toString(), // You can retrieve it later from webhook
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Stripe session');
  }
});


app.get('/success', async (req, res) => {
  const { email } = req.query;

  try {
    const orders = await Order.find({ userEmail: email });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }
});


app.delete('/order/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send("Order deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting order");
  }
});



module.exports = app;
