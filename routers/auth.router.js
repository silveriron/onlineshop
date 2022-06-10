const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.get("/signup", authController.getSignUp);

router.get("/login", authController.getLogin);

router.get("/admin", authController.getAdmin);

module.exports = router;
