const Product = require('../models/product.models')

const getAdminProduct = (req, res) => {
  res.render("admin/product");
};

const adminProduct = (req, res) => {
  const data = req.body
  const product = new Product(data.title, data.summary, data.price, data.content, req.file.filename)
  product.save()
  res.redirect('/admin/product');
};

const getAdminOrder = (req, res) => {
  res.render("admin/product");
};

const adminOrder = (req, res) => {
  res.render("admin/product");
};

module.exports = {
  getAdminProduct: getAdminProduct,
  adminProduct: adminProduct,
  getAdminOrder: getAdminOrder,
  adminOrder: adminOrder,
};
