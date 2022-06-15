const Product = require("../models/product.models");

const getAdminProduct = async (req, res) => {
  const product = new Product();
  const products = await product.load();
  res.render("admin/productManage", { products: products });
};

const adminProduct = (req, res) => {
  const data = req.body;
  const product = new Product(
    data.title,
    data.summary,
    data.price,
    data.content,
    data.category,
    req.file.filename
  );
  product.save();

  res.redirect("/admin/product");
};

const getAdminOrder = (req, res) => {
  res.render("admin/includes/productList");
};

const adminOrder = (req, res) => {
  res.render("admin/productManage");
};

module.exports = {
  getAdminProduct: getAdminProduct,
  adminProduct: adminProduct,
  getAdminOrder: getAdminOrder,
  adminOrder: adminOrder,
};
