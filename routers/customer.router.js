const express = require("express");
const router = express.Router();


const customerController = require("../controllers/customer.controller");


router.get("/product", customerController.getCustomerProduct);

router.get("/product/:id", customerController.getProductDetail)

router.post("/product/:id", customerController.cartIn)

router.get("/cart", customerController.getCart)

router.post("/cart", customerController.cart)

router.get("/cart/:title/delete", customerController.cartDelete)


module.exports = router;
