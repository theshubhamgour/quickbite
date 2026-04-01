const express = require('express');
const router = express.Router();

// Hardcoded food items
const foods = [
  {
    id: 1,
    name: "Classic Cheese Pizza",
    price: 350,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Spicy Zinger Burger",
    price: 150,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Hyderabadi Chicken Biryani",
    price: 250,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Butter Chicken",
    price: 300,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Tandoori Roti & Paneer",
    price: 200,
    image: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    price: 120,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=60"
  }
];

// Get all foods
router.get('/foods', (req, res) => {
  res.json(foods);
});

module.exports = router;
