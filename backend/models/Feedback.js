const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  feedbackText: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
