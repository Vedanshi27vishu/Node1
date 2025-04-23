const express = require('express');
const { handleGenerateNewShortURL , getallurl, handleRedirect} = require("../controllers/url.js");
const {createuser, getalluser, getbyname}= require("../controllers/user.js");
const {loginuser}= require("../controllers/login.js");
const router = express.Router();
const {auth} = require("../middlewares/auth.js");
const URL = require("../models/url");


router.post('/user', createuser);
router.get('/alluser', getalluser);
router.get('/user/:name', getbyname);

router.post('/',auth, handleGenerateNewShortURL); // ✅ just '/'
  router.get('/',getallurl);
router.get('/redirect/:short', handleRedirect);



router.post('/login', loginuser); 


router.get("/protected-urls", auth, async (req, res) => {
  const urls = await URL.find({});
  res.status(200).json({ message: "Access granted", urls });
});

// Route for admin (see all users or all URLs)
router.get("/admin/urls", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const urls = await URL.find({});
  res.status(200).json({ message: "All URLs", urls });
});

// Route for user (only their own URLs)
router.get("/my-urls", auth, async (req, res) => {
  const urls = await URL.find({ createdBy: req.user.userId });
  res.status(200).json({ message: "Your URLs", urls });
});


module.exports = router;
