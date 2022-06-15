const db = require('../data/database')

class Product {
    constructor(title, summary, price, content, filename) {
        this.title = title;
        this.summary = summary;
        this.price = +price;
        this.content = content;
        this.filename = filename;
    }

    async save() {
        const product = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            content: this.content,
            filename: this.filename
        }
        await db.getDb().collection('product').insertOne(product)
    }

    async load() {
        const product = await db.getDb().collection('product').find().toArray()
        return product
    }
}

module.exports = Product