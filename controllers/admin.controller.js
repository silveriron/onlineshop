const getAdminProduct = (req, res) => {
  res.render("admin/product");
};

module.exports = {
  getAdminProduct: getAdminProduct,
};
