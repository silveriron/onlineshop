const cartIn = (req, res, next) => {
    res.locals.cartList = req.session.cartList;
    next();
};
  
module.exports = cartIn;
  