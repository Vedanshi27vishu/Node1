const jwt = require("jsonwebtoken");

const SECRET_KEY = "Vedanshi1234"; // Move this to .env in production

function auth(req, res, next) {
  console.log("🔐 Auth middleware triggered");

  const authHeader = req.headers.authorization;

  // Step 1: Check if token exists and has correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token found or format invalid");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Step 2: Extract token
  const token = authHeader.split(" ")[1];
  console.log("🧾 Token received:", token);

  try {
    // Step 3: Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("✅ Token verified:", decoded);

    // Step 4: Attach user data to request object
    req.user = decoded;

    // Step 5: Move to next middleware/route
    next();

  } catch (error) {
    console.log("⚠️ Token error:", error.message);

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      error: error.message,
    });
  }
}

module.exports = { auth };
