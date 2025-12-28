// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //   const token = req.headers.authorization;
// //   if (!token) return res.status(401).json({ error: "No token" });

// //   req.user = jwt.verify(token, "secret");
// //   next();
// // };

// const jwt = require('jsonwebtoken'); // تأكد من تثبيت jsonwebtoken عبر npm install jsonwebtoken

// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', ''); // افترض أن التوكن في header
//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key'); // استخدم متغير بيئة للسر
//     req.user = decoded; // أضف المستخدم إلى الطلب
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = auth;

// src/middlewares/auth.middleware.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // لازم يكون: "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized: Invalid token format" });
  }

  const token = parts[1];
console.log("AUTH HEADER:", req.headers.authorization);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ هنا المهم
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
console.log("JWT VERIFY ERROR:", err.name, err.message);
  console.log("JWT_SECRET exists?", !!process.env.JWT_SECRET);
  return res.status(401).json({ message: "Unauthorized: Token is invalid" });  }
};
