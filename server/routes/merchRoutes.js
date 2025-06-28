const express = require('express');
const Merch = require('../models/Merch');

const router = express.Router();

// API to get all merch
router.get('/', async (req, res) => {
  try {
    const merch = await Merch.find();
    res.json(merch);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch merch data' });
  }
});

// API to get a specific merch item by ID
router.get('/:id', async (req, res) => {
  try {
    const merchItem = await Merch.findById(req.params.id);
    if (!merchItem) {
      return res.status(404).json({ error: 'Merch item not found' });
    }
    res.json(merchItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch merch item details' });
  }
});

module.exports = router;
