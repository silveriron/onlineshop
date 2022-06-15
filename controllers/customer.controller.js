const Product = require("../models/product.models");

const getCustomerProduct = async (req, res) => {
  const product = new Product();
  const products = await product.load();
  res.render("customer/productPage", { products: products });
};

const getProductDetail = async (req, res) => {
  const id = req.params.id
  const product = new Product()
  const productData = await product.loadOne(id)
  res.render("customer/productDetail", { product: productData})
}

module.exports = {
  getCustomerProduct: getCustomerProduct,
  getProductDetail: getProductDetail,
};
