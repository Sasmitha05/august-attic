import mongoose from 'mongoose';

const merchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: String,
  category: String,
  inStock: { type: Boolean, default: true }
}, { 
  timestamps: true,
  collection: 'merches' // This will use the 'merch' collection
});

export default mongoose.model('Merch', merchSchema);