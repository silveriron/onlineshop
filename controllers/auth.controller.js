const getSignUp = (req, res) => {
  res.render("admin/signup", {title: 'Signup'});
};

const getLogin = (req, res) => {

};

const getAdmin = (req, res) => {

};

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  getAdmin: getAdmin,
};
