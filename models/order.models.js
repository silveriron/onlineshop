const db = require("../data/database");
const uuid = require("uuid");

class Order {
  constructor(user, orderList) {
    this.user = user;
    this.orderList = orderList;
  }

  async save() {
    let title
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    if (this.orderList.length === 1) {
      title = this.orderList[0].title
    } else {
      title =
        this.orderList[0].title +
        " 외" +
        String(this.orderList.length - 1) +
        " 건";
    }
    let totalPrice = 0;
    for (const orderList of this.orderList) {
      totalPrice += orderList.price;
    }
    await db.getDb().collection("order").insertOne({
      id: uuid.v4(),
      date: year + '년 ' + month + '월 ' + date + '일',
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
