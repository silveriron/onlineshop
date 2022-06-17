const Product = require("../models/product.models");

const getCustomerProduct = async (req, res) => {
  const category = req.query.category
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

const cartIn = async (req, res) => {
  const id = req.params.id
  const product = new Product()
  const productData = await product.loadOne(id)
  const data = req.body
  const cartProduct = {
    ...productData,
    ordercount: +data.orderCount
  }
  const cartList = req.session.cartList

  if (!cartList) {
    req.session.cartList = []
  }

  req.session.cartList.push(cartProduct)
  req.session.save(() => {
    console.log(req.session.cartList)
    res.redirect('/customer/cart')
  })

}

const getCart = (req, res) => {
  res.render("customer/cartList")
}

module.exports = {
  getCustomerProduct: getCustomerProduct,
  getProductDetail: getProductDetail,
  cartIn: cartIn,
  getCart: getCart
};
