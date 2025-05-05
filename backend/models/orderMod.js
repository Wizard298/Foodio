const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   email: String,
//   items: [
//     {
//       name: String,
//       quantity: Number,
//       price: Number,
//     },
//   ],
//   totalAmount: Number,
//   createdAt: Date,
// });

const orderSchema = new mongoose.Schema({
  userEmail: String,
  cartItems: Array,
  totalAmount: Number,
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Order', orderSchema);
