const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, default: 0 },
  category: { type: String, required: true, default: 'Signature Coffee' },
  roast: { type: String, default: 'Medium' },
  origin: { type: String, default: 'House Blend' },
  tastingNotes: [{ type: String }],
  image: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  reviews: [reviewSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
