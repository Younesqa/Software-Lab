// src/middlewares/role.middleware.js

module.exports = function(requiredRole) {
  return (req, res, next) => {
    const user = req.user; // هذه البيانات جايه من auth.middleware
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
};
