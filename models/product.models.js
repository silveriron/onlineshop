const db = require("../data/database");
const numberWithCommas = require("../util/numberWithCommas");
const ObjectId = require('mongodb').ObjectId

class Product {
  constructor(title, summary, price, content, category, filename) {
    this.title = title;
    this.summary = summary;
    this.price = +price;
    this.content = content;
    this.category = category;
    this.filename = filename;
  }

  async save() {
    const product = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      content: this.content,
      category: this.category,
      filename: this.filename,
    };
    await db.getDb().collection("product").insertOne(product);
  }

  async load() {
    const products = await db.getDb().collection("product").find().toArray();
    products.map((product) => {
      const price = product.price;
      const commasPrice = numberWithCommas(price) + "원";
      product.commasPrice = commasPrice;
    });
    return products;
  }

  async loadOne(id) {
    const product = await db.getDb().collection("product").findOne({_id: ObjectId(id)})
    const price = product.price;
    const commasPrice = numberWithCommas(price) + "원";
    product.commasPrice = commasPrice;
    return product
  }
}

module.exports = Product;
