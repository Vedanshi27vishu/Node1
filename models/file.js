const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  filename: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "USERS" } // optional
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
