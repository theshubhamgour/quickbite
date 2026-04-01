const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const User = require('./models/user');

// Import routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodiehub';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await seedUsers(); // Seed dummy users for testing
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Seeding dummy users if not present
async function seedUsers() {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log('Seeding predefined users...');
    await User.create([
      { username: 'testuser', password: 'password123', location: 'Nagpur' },
      { username: 'admin', password: 'adminpassword', location: 'Nagpur' }
    ]);
    console.log('✅ Users seeded successfully!');
  }
}

// Routes
app.use('/api', authRoutes);
app.use('/api', foodRoutes);
app.use('/api', orderRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('QuickBite / FoodieHub API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
