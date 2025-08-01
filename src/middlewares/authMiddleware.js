const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id, 
      role: decoded.role,
      email: decoded.email,
    };

    console.log("Authenticated user:", req.user); 

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
