const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customer.controller");

router.get("/product", customerController.getCustomerProduct);

router.get("/product/:id", customerController.getProductDetail)

module.exports = router;
