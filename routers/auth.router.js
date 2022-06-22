const express = require("express");
const router = express.Router();
const uuid = require("uuid")

const authController = require("../controllers/auth.controller");

router.get("/", (req, res) => {
  res.redirect('/customer/product')
})

router.get("/signup", authController.getSignUp);

router.post("/signup", authController.signUp);

router.get("/login", authController.getLogin);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/duplicate", authController.duplicate);

router.post("/checkaddress", authController.checkAddress)

router.get("*", (req, res) => {
  res.status(404).render("base/404");
});

module.exports = router;
