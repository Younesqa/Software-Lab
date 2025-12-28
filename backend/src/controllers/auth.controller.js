const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EmailStrategy = require("../strategies/email.strategy");
const VerificationContext = require("../strategies/verification.context");

class AuthController {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userRepo.create({
        name,
        email,
        password: hashedPassword,
        role: "customer",
      });

      // Strategy Pattern
      const verification = new VerificationContext(
        new EmailStrategy()
      );
      verification.execute(user);

      res.json({ message: "Registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);


      res.json({ token });
    }  catch (err) {
    console.error("LOGIN ERROR:", err);
  return res.status(500).json({ error: "Server error" });
}

}}
  

module.exports = AuthController;
  