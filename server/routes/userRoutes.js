import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Helper function to validate email format
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-2.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Helper function to validate password strength
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

// Signup route to create a new user
router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ email, name, password });
    await newUser.save();
    
    // Don't send password back to client
    const { password: _, ...userResponse } = newUser.toObject();
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login route to authenticate user
router.post('/login', async (req, res) => {
  console.log('Login attempt for:', req.body.email); // Debugging
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Note: In production, you should hash passwords and compare hashes
    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

export default router;