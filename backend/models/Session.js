const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  chatHistory: Array,
  jsxCode: String,
  cssCode: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
