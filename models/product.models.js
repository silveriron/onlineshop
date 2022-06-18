const db = require("../data/database");
const numberWithCommas = require("../util/numberWithCommas");
const ObjectId = require("mongodb").ObjectId;

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

  async load(category) {
    let products;
    if (category) {
      products = await db
        .getDb()
        .collection("product")
        .find({ category: category })
        .toArray();
      console.log(products);
    } else {
      products = await db.getDb().collection("product").find().toArray();
    }

    if (products.length === 1) {
      const price = products[0].price;
      const commasPrice = numberWithCommas(price) + "원";
      products[0].commasPrice = commasPrice;
    } else {
      products.map((product) => {
        const price = product.price;
        const commasPrice = numberWithCommas(price) + "원";
        product.commasPrice = commasPrice;
      });
    }
    return products;
  }

  async loadOne(id) {
    const product = await db
      .getDb()
      .collection("product")
      .findOne({ _id: ObjectId(id) });
    const price = product.price;
    const commasPrice = numberWithCommas(price) + "원";
    product.commasPrice = commasPrice;
    return product;
  }

  async updateOne(id) {
    if (!this.filename) {
      console.log("a");
      await db
        .getDb()
        .collection("product")
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              title: this.title,
              summary: this.summary,
              price: this.price,
              content: this.content,
              category: this.category,
            },
          }
        );
      return;
    }
    await db
      .getDb()
      .collection("product")
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title: this.title,
            summary: this.summary,
            price: this.price,
            content: this.content,
            category: this.category,
            filename: this.filename,
          },
        }
      );
  }

  async deleteOne(id) {
    await db
      .getDb()
      .collection("product")
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Product;
