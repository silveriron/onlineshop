const db = require("../data/database");

class Order {
  constructor(user, orderList) {
    this.user = user;
    this.orderList = orderList;
  }

  async save() {
    const title =
      this.orderList[0].title +
      " 외" +
      String(this.orderList.length - 1) +
      " 건";
    let totalPrice = 0;
    for (const orderList of this.orderList) {
      totalPrice += orderList.price;
    }
    await db.getDb().collection("order").insertOne({
      user: this.user,
      title: title,
      totalPrice: totalPrice,
      orderStatus: "배송준비중",
      orderList: this.orderList,
    });
  }

  async load(userEmail) {
    const orderLists = await db
      .getDb()
      .collection("order")
      .find({
        "user.email": userEmail,
      })
      .toArray();
    return orderLists;
  }
}

module.exports = Order;
