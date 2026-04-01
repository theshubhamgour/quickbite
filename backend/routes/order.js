const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create a new order (Cart checkout)
router.post('/order', async (req, res) => {
  try {
    const { username, items, totalAmount, location } = req.body;

    if (!username || !items || items.length === 0 || totalAmount === undefined) {
      return res.status(400).json({ error: 'Missing required order fields or empty cart' });
    }

    const newOrder = new Order({
      username,
      items,
      totalAmount,
      location: location || 'Nagpur' // Default to Nagpur if not provided
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's orders
router.get('/orders', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required to fetch orders' });
    }

    const orders = await Order.find({ username }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
