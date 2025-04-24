require('dotenv').config(); // 👈 for .env

const express = require('express');
const mongoose = require("mongoose");
const urlRoute = require('./routes/url.js');
const noteRoutes = require("./routes/upload.js");

const app = express();
const PORT = process.env.PORT || 8001;

// ✅ MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Atlas connected!");
})
.catch((err) => {
  console.error("❌ MongoDB Error:", err.message);
});

app.use(express.json());

// ✅ Routes
app.use("/", urlRoute);
app.use("/", noteRoutes);

// ✅ Optional: serve uploaded files
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`🚀 Server Started on PORT ${PORT}`);
});
