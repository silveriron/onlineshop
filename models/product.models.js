const db = require('../data/database')
const numberWithCommas = require('../util/numberWithCommas')

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
        const products = await db.getDb().collection('product').find().toArray()
        products.map(product => {
            const price = product.price;
            const commasPrice = numberWithCommas(price) + '원';
            product.commasPrice = commasPrice
        })
        return products
    }
}

module.exports = Product