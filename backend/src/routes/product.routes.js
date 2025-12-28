const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/product.controller");

router.get("/", authMiddleware, ctrl.getAllProducts);
router.post("/", authMiddleware, role("admin"), ctrl.createProduct);
router.put("/:id", authMiddleware, role("admin"), ctrl.updateProduct);
router.delete("/:id", authMiddleware, role("admin"), ctrl.deleteProduct);

module.exports = router;
