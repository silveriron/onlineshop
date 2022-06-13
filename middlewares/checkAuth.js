const checkAuth = (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  next();
};

module.exports = checkAuth;
