// const express = require('express');
// const router = express.Router();
// router.get("/", ctrl.getAll);
// router.post("/", auth, role("admin"), ctrl.create);
// router.put("/:id", auth, role("admin"), ctrl.update);
// router.delete("/:id", auth, role("admin"), ctrl.delete);

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/category.controller");

router.get("/", authMiddleware, ctrl.getAllCategories);
router.post("/", authMiddleware, role("admin"), ctrl.createCategory);
router.put("/:id", authMiddleware, role("admin"), ctrl.updateCategory);
router.delete("/:id", authMiddleware, role("admin"), ctrl.deleteCategory);

module.exports = router;
