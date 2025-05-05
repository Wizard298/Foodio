const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    required: true
  },
  cartAdded: {
    type: Boolean,
    default : false
  }
});


module.exports = mongoose.model('items', itemSchema);
