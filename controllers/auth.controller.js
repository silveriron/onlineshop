const authModels = require("../models/auth.models");

const getSignUp = (req, res) => {
  res.render("admin/signup");
};

const getLogin = (req, res) => {
  res.render("admin/login");
};

const getAdmin = (req, res) => {};

const signUp = async (req, res) => {
  const data = req.body;
  if (
    !data.email ||
    !data.email.includes("@") ||
    !data.password ||
    !data.name ||
    !data.address ||
    data.password < 6 ||
    data.password !== data["confirm-password"]
  ) {
    console.log("가입 양식 문제");
    res.redirect("/signup");
    return;
  }

  const alreadyEmail = await authModels.checkAlreadySignup(data.email);

  if (alreadyEmail) {
    console.log("중복 가입");
    res.redirect("/signup");
    return;
  }

  await authModels.signup(data.email, data.password, data.name, data.address);
  res.redirect("/login");
};

const login = async (req, res) => {
  const data = req.body;
  const checkLogin = await authModels.login(data.email, data.password);
  if (!checkLogin === "login") {
    console.log(checkLogin);
    res.redirect("/login");
    return;
  }
  req.session.isAuth = true;
  req.session.email = data.email;
  req.session.name = data.name;
  req.session.save(() => {
    res.redirect("/");
  });
};

const logout = (req, res) => {
  req.session.isAuth = null;
  req.session.email = null;
  req.session.name = null;
  req.session.save(() => {
    res.redirect("/");
  });
};

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  getAdmin: getAdmin,
  signUp: signUp,
  login: login,
  logout: logout,
};
