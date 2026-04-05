const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  sizes: [{ type: Number, required: true }],
  colours: [{ type: String, required: true }], // Hex codes or names
  images: [{ type: String, required: true }],
  modelUrl: { type: String }, // GLTF url
  stock: { type: Number, required: true, default: 0 },
  department: { type: String, default: 'shoes' },
  category: { type: String, required: true },
  ratings: [ratingSchema],
  ratingAvg: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
