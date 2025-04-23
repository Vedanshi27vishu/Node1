const USERS = require("../models/user");
const URL = require("../models/url");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "Vedanshi1234";

async function loginuser(req, res) {
  try {
    const { Name, Email } = req.body;

    const user = await USERS.findOne({ Name, Email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        Name: user.Name,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const urls = await URL.find();

    res.status(200).json({
      message: "Login successful",
      token: token,
      urls: urls,
    });
  } catch (error) {
    console.error("Login Error:", error.stack || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { loginuser }; // ✅ Export as function
