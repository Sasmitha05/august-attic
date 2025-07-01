import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import merchRoutes from './routes/merchRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Add this import

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// In server/server.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://august-attic.onrender.com'] // ⬅️ UPDATE THIS
    : ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment-based MongoDB Connection
const connectDB = async () => {
  try {
    let mongoURI;
    
    if (process.env.NODE_ENV === 'production') {
      mongoURI = process.env.MONGODB_ATLAS_URI;
      console.log('🌐 Connecting to MongoDB Atlas (Production)...');
    } else {
      mongoURI = process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017/merch';
      console.log('🏠 Connecting to MongoDB Compass (Development)...');
    }

    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    await mongoose.connect(mongoURI);
    
    console.log(`✅ Connected to MongoDB (${process.env.NODE_ENV || 'development'})`);
    console.log(`📡 Database: ${mongoose.connection.name}`);
    
    // List collections on connection
    mongoose.connection.db.listCollections().toArray()
      .then(collections => {
        console.log('📋 Available collections:', collections.map(c => c.name));
      })
      .catch(err => console.log('Error listing collections:', err));
      
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.get('/api/test', (req, res) => {
  res.json({
    message: 'August Attic Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.NODE_ENV === 'production' ? 'Atlas' : 'Compass'
  });
});

app.use('/api/merch', merchRoutes);
app.use('/api/users', userRoutes); // Add this line

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Database: ${process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'MongoDB Compass'}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
});