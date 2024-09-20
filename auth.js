const express = require('express');
const User = require('../models/User'); // Adjust path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user with the hashed password
    const user = new User({ username, password: hashedPassword });
    
    // Save the user in the database
    await user.save();
    
    // Send success response
    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(400).send('Invalid credentials - user not found');
    }

    // Compare the given password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(400).send('Invalid credentials - password mismatch');
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
