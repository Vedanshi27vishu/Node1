const USERS = require("../models/user"); // ✅ fixed import

async function createuser(req, res) {
  try {
    const body = req.body;
    console.log("🧾 Incoming body:", body);

    if (!body.Name || !body.Email || !body.role) {
      return res.status(400).json({ error: 'Not complete info' });
    }

    const existing = await USERS.findOne({ Email: body.Email });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    await USERS.create(body);
    return res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error("❌ Create User Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getalluser(req, res) {
  const users = await USERS.find({});
  res.json(users);
}

async function getbyname(req, res) {
  const name = req.params.name;
  const user = await USERS.findOne({ Name: name });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
}

module.exports = {
  createuser,
  getalluser,
  getbyname
};
