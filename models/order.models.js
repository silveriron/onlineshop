const db = require("../data/database");
const uuid = require("uuid");
const numberWithCommas = require("../util/numberWithCommas");
const e = require("express");
const ObjectId = require("mongodb").ObjectId;

class Order {
  constructor(user, orderList) {
    this.user = user;
    this.orderList = orderList;
  }

  async save() {
    let title;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    if (this.orderList.length === 1) {
      title = this.orderList[0].title;
    } else {
      title =
        this.orderList[0].title +
        " 외" +
        String(this.orderList.length - 1) +
        " 건";
    }
    let totalPrice = 0;
    for (const orderList of this.orderList) {
      totalPrice += orderList.price * orderList.orderCount;
    }
    await db
      .getDb()
      .collection("order")
      .insertOne({
        id: uuid.v4(),
        date: year + "년 " + month + "월 " + date + "일",
        user: this.user,
        title: title,
        totalPrice: totalPrice,
        viewPrice: numberWithCommas(totalPrice),
        orderStatus: "배송준비중",
        orderList: this.orderList,
      });
  }

  async load(userEmail) {
    if (userEmail === "admin") {
      const orderLists = await db.getDb().collection("order").find().toArray();
      return orderLists
    }
    const orderLists = await db
      .getDb()
      .collection("order")
      .find({
        "user.email": userEmail,
      })
      .toArray();
    return orderLists;
  }

  async loadOne(id) {
    const order = await db
      .getDb()
      .collection("order")
      .findOne({ _id: ObjectId(id) });
    return order;
  }

  async changeOrderStatus(id, orderStatus, trackingNumber) {
    await db.getDb().collection("order").updateOne({_id: ObjectId(id)}, {$set:{orderStatus: orderStatus, trackingNumber: trackingNumber}})
  }
}

module.exports = Order;
