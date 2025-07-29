const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is present and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach full decoded user to req.user
    req.user = {
      id: decoded.userId,
      role: decoded.role,
      email: decoded.email, // Optional
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
