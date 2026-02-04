const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "You must be logged in." });
};

const isAdmin = (req, res, next) => {
  // Only allow if user exists AND has the admin role
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: "Access Denied: Admins Only" });
};

module.exports = { isAuthenticated, isAdmin };