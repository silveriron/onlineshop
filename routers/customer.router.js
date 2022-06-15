const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customer.controller");

router.get("/product", customerController.getCustomerProduct);

module.exports = router;
