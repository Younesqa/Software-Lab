const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth.controller");
const userRepo = require("../repositories/user.repository");
const authMiddleware = require("../middlewares/auth.middleware"); // ✅ عدّل المسار حسب مشروعك

const controller = new AuthController(userRepo);

// ✅ /auth/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // استخدم repo بدل db
    const user = await userRepo.findById(userId); // لازم تكون موجودة (بنضيفها تحت إذا مش موجودة)

    if (!user) return res.status(404).json({ message: "User not found" });

    // رجّع بيانات بدون password
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.log("ME ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", (req, res) => controller.register(req, res));
router.post("/login", (req, res) => controller.login(req, res));

module.exports = router;
