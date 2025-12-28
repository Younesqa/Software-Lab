// const app = require("./app");

// app.listen(5000, () => {
//   console.log("API running on port 5000");
// });
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

// ===== Routes =====
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

// ===== App =====
const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());

// ===== Static uploads =====
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ===== Routes mounting =====
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// ===== Start server =====
console.log("JWT_SECRET:", process.env.JWT_SECRET);
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
