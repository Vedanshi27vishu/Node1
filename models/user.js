const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
});

// You can still name it USERS, but export it directly
const USERS = mongoose.model('USERS', userSchema);
module.exports = USERS; // ✅ FIXED
