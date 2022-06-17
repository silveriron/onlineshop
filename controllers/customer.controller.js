const Product = require("../models/product.models");

const getCustomerProduct = async (req, res) => {
  const category = req.query.category
  const product = new Product();
  const products = await product.load(category);
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

const cart = (req, res) => {
  console.log(res.locals.user, res.locals.cartList)
}

const cartDelete = (req, res) => {
  const title = req.params.title
  const cartList = req.session.cartList.filter(product => product.title !== title);
  req.session.cartList = cartList;
  req.session.save(() => {
    res.redirect('/customer/cart')
  })
}

module.exports = {
  getCustomerProduct: getCustomerProduct,
  getProductDetail: getProductDetail,
  cartIn: cartIn,
  getCart: getCart,
  cart: cart,
  cartDelete: cartDelete,
};
