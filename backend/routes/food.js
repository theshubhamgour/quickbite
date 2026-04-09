const express = require('express');
const router = express.Router();

// Hardcoded food items
const foods = [
  {
    id: 1,
    name: "Classic Cheese Pizza",
    category: "Fast Food",
    price: 350,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Spicy Zinger Burger",
    category: "Fast Food",
    price: 150,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Hyderabadi Chicken Biryani",
    category: "Indian",
    price: 250,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Butter Chicken",
    category: "Indian",
    price: 300,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Tandoori Roti & Paneer",
    category: "Indian",
    price: 200,
    image: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Dal Makhani",
    category: "Indian",
    price: 180,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Chole Bhature",
    category: "Indian",
    price: 120,
    image: "assets/chole_bhature.png"
  },
  {
    id: 8,
    name: "Paneer Tikka",
    category: "Indian",
    price: 220,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    name: "Masala Dosa",
    category: "Indian",
    price: 100,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    name: "Veg Hakka Noodles",
    category: "Chinese",
    price: 140,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 11,
    name: "Gobi Manchurian",
    category: "Chinese",
    price: 160,
    image: "assets/gobi_manchurian.png"
  },
  {
    id: 12,
    name: "Spring Rolls (4pcs)",
    category: "Chinese",
    price: 110,
    image: "assets/spring_rolls.png"
  },
  {
    id: 13,
    name: "Chocolate Lava Cake",
    category: "Sweets",
    price: 120,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 14,
    name: "Gulab Jamun (2pcs)",
    category: "Sweets",
    price: 60,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 15,
    name: "Rasmalai (2pcs)",
    category: "Sweets",
    price: 80,
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&auto=format&fit=crop&q=60"
  }
];

// Get all foods
router.get('/foods', (req, res) => {
  res.json(foods);
});

module.exports = router;
