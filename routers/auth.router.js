const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.get('/', (req, res) => {
    res.redirect('/signup')
})

router.get("/signup", authController.getSignUp);

router.post("/signup", authController.signUp);

router.get("/login", authController.getLogin);

router.post("/login", authController.login);

router.get("/admin", authController.getAdmin);


module.exports = router;
