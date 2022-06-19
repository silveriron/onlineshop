const db = require("../data/database");

class Order {
  constructor(user, orderList) {
    this.user = user;
    this.orderList = orderList;
  }

  async save() {
    await db.getDb().collection("order").insertOne({
      user: this.user,
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
