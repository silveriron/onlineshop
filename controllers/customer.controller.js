const Product = require("../models/product.models");

const getCustomerProduct = async (req, res) => {
  const product = new Product();
  const products = await product.load();
  res.render("customer/productPage", { products: products });
};

module.exports = {
  getCustomerProduct: getCustomerProduct,
};
