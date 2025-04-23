const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const Note = require("../models/file");

router.post("/upload-note", upload.single("file"), async (req, res) => {
  try {
    const { subject } = req.body;

    if (!req.file || !subject) {
      return res.status(400).json({ error: "Subject and file are required" });
    }

    const note = await Note.create({
      subject,
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      // uploadedBy: req.user?.userId (if using auth)
    });

    res.status(201).json({ message: "Note uploaded", note });

  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
