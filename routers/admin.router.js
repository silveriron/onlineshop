const express = require("express");
const path = require("path");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "./../public/img/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/product", adminController.getAdminProduct);

router.post("/product", adminController.adminProduct);

router.get("/product/:id/update", adminController.getProductUpdate);

router.post("/product/:id/update", adminController.ProductUpdate);

router.delete("/product/:id/delete", adminController.ProductDelete);

router.get("/order", adminController.getAdminOrder);

router.post("/order", adminController.adminOrder);

module.exports = router;
