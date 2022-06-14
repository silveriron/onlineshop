const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/product", adminController.getAdminProduct);

module.exports = router;
