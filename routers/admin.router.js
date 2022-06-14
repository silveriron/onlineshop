const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/product", adminController.getAdminProduct);

router.post("/product", adminController.adminProduct);

router.get("/order", adminController.getAdminOrder);

router.post("/order", adminController.adminOrder);

module.exports = router;
