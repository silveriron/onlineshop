const MongoClient = require("mongodb").MongoClient;

let database;

const connect = async () => {
  const client = await MongoClient.connect("mongodb+srv://kichul7493:sea016304@cluster0.fk4bm.mongodb.net/?retryWrites=true&w=majority");
  database = await client.db("onlineshop");
};

const getDb = () => {
  if (!database) {
    throw { message: "this connect is wrong" };
  }
  return database;
};

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
