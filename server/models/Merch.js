const mongoose = require('mongoose');

const merchSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model('Merch', merchSchema);
