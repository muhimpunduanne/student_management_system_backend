function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role; // Uses role from authMiddleware

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    next();
  };
}

module.exports = authorizeRoles;
