// routes/itemRoutes.js (or inside your existing route file)
const express = require('express');
const app = express.Router();
const Item = require('../models/itemMod'); // adjust the path accordingly

app.post('/add-item', async (req, res) => {
  try {
    const { img, name, price, description, category } = req.body;

    const newItem = new Item({
      img,
      name,
      price,
      description,
      category,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } 
  catch (error) {
    console.error('Error saving item:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/foods', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
