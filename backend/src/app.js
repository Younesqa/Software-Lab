// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api"
// });

// API.interceptors.request.use(req => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = token;
//   }
//   return req;
// });

// export default API;

// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/auth.routes");
// const categoryRoutes = require("./routes/category.routes");
// const productRoutes = require("./routes/product.routes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/products", require("./routes/product.routes"));
// module.exports = app;

const express = require("express");
const path = require("path");
const app = express();

// Body parser
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// استدعاء الـ routes
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// مهم جدًا للتعامل مع preflight
app.options("*", cors());

app.options("*", cors());
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

module.exports = app;
