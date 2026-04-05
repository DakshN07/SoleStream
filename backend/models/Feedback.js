const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  brand: { type: String, required: true },
  sizePurchased: { type: Number, required: true },
  fitAccuracy: { type: Number, min: 1, max: 5, required: true },
  comfortLevel: { type: Number, min: 1, max: 5, required: true },
  trueToSize: { type: String, enum: ['Yes', 'Slightly off', 'No'], required: true },
  comment: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
