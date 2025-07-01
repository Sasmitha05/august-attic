import express from 'express';
import mongoose from 'mongoose';
import Merch from '../models/Merch.js';

const router = express.Router();

// Debug route - MUST be before the /:id route
router.get('/debug', async (req, res) => {
  try {
    console.log('🔍 Debug route called');
    
    // Check database connection
    const dbState = mongoose.connection.readyState;
    console.log('📡 DB Connection State:', dbState);
    
    if (dbState !== 1) {
      return res.json({
        error: 'Database not connected',
        dbState: dbState,
        states: { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' }
      });
    }
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 All Collections:', collections.map(c => c.name));
    
    // Check Merch model collection
    const merchCount = await Merch.countDocuments();
    console.log('📊 Merch model count:', merchCount);
    
    const merchSample = await Merch.find().limit(3);
    console.log('📝 Merch model samples:', merchSample);
    
    res.json({ 
      success: true,
      environment: process.env.NODE_ENV || 'development',
      database: process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'MongoDB Compass',
      dbConnected: dbState === 1,
      databaseName: mongoose.connection.name,
      allCollections: collections.map(c => c.name),
      merchModelCount: merchCount,
      merchSamples: merchSample,
      modelCollectionName: Merch.collection.name,
      modelName: Merch.modelName
    });
    
  } catch (err) {
    console.error('❌ Debug route error:', err);
    res.status(500).json({ 
      error: err.message, 
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  }
});

// Get all merch items
router.get('/', async (req, res) => {
  try {
    console.log('📦 Fetching all merch items...');
    console.log(`🏪 Using database: ${process.env.NODE_ENV === 'production' ? 'Atlas' : 'Compass'}`);
    
    const merchItems = await Merch.find().sort({ createdAt: -1 });
    console.log(`📊 Found ${merchItems.length} merch items`);
    
    if (merchItems.length === 0) {
      console.log('⚠️ No merch items found. Check your database connection and data.');
    }
    
    res.json(merchItems);
  } catch (err) {
    console.error('❌ Error fetching merch:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single merch item
router.get('/:id', async (req, res) => {
  try {
    console.log(`🔍 Fetching merch item with ID: ${req.params.id}`);
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }
    
    const merch = await Merch.findById(req.params.id);
    if (!merch) {
      return res.status(404).json({ error: 'Merch item not found' });
    }
    
    console.log(`✅ Found merch item: ${merch.name}`);
    res.json(merch);
  } catch (err) {
    console.error('❌ Error fetching merch by ID:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new merch item (for testing/admin use)
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new merch item:', req.body);
    
    const merch = new Merch(req.body);
    const savedMerch = await merch.save();
    
    console.log(`✅ Created merch item: ${savedMerch.name}`);
    res.status(201).json(savedMerch);
  } catch (err) {
    console.error('❌ Error creating merch:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
