const getAdminProduct = (req, res) => {
  res.render("admin/product");
};

const adminProduct = (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.render("admin/product");
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
