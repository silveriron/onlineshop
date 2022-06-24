const Product = require("../models/product.models");
const fs = require("fs");
const path = require("path");
const Order = require("../models/order.models");

const getAdminProduct = async (req, res) => {
  if (!res.locals.isAdmin) {
    res.status(404).render("404");
  }
  const product = new Product();
  const products = await product.load();
  res.render("admin/productManage", { products: products });
};

const adminProduct = async (req, res) => {
  const data = req.body;
  const product = new Product(
    data.title,
    data.summary,
    data.price,
    data.content,
    data.category,
    data.imgURL
  );
  await product.save();

  res.redirect("/admin/product");
};

const getProductUpdate = async (req, res) => {
  const id = req.params.id;
  const product = new Product();
  const productData = await product.loadOne(id);
  res.render("admin/productUpdate", { product: productData });
};

const ProductUpdate = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  // if (!req.file) {
  //   const product = new Product(
  //     data.title,
  //     data.summary,
  //     data.price,
  //     data.content,
  //     data.category
  //   );
  //   await product.updateOne(id);
  //   res.redirect("/admin/product");
  //   return;
  // }
  const product = new Product(
    data.title,
    data.summary,
    data.price,
    data.content,
    data.category,
    data.imgURL
  );
  const productDate = await product.loadOne(id);
  // const imgpath = path.join(__dirname + "./../public/img/");
  // await fs.unlink(imgpath + productDate.filename, (err) => {
  //   if (err) {
  //     throw { message: "wrong" };
  //   }
  // });
  await product.updateOne(id);
  res.redirect("/admin/product");
};

const ProductDelete = async (req, res) => {
  const id = req.params.id;
  const product = new Product();
  // const productDate = await product.loadOne(id);
  // const imgpath = path.join(__dirname + "./../public/img/");
  await product.deleteOne(id);
  // await fs.unlink(imgpath + productDate.filename, (err) => {
  //   if (err) {
  //     throw { message: "wrong" };
  //   }
  // });
};

const getAdminOrder = async (req, res) => {
  if (!res.locals.isAdmin) {
    res.status(404).render("404");
    return
  }
  const order = new Order();
  const orderLists = await order.load("admin");
  res.render("admin/orderManage", {orderLists: orderLists});
};

const getAdminOrderDetail = async (req, res) => {
  const id = req.params.id;
  const order = new Order();
  const orderList = await order.loadOne(id);
  res.render("admin/orderManageDetail", {
    orderid: orderList._id,
    orderList: orderList.orderList,
    orderStatus: orderList.orderStatus,
    user: orderList.user,
    date: orderList.date
  })
}

const adminOrderStatus = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const order = new Order();
  await order.changeOrderStatus(id, data.orderStatus, data.trackingNumber);
  res.redirect(`/admin/order/${id}`);
};

module.exports = {
  getAdminProduct: getAdminProduct,
  adminProduct: adminProduct,
  getAdminOrder: getAdminOrder,
  adminOrderStatus: adminOrderStatus,
  getProductUpdate: getProductUpdate,
  ProductUpdate: ProductUpdate,
  ProductDelete: ProductDelete,
  getAdminOrderDetail,getAdminOrderDetail,
};
