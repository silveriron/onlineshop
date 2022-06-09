const MongoClient = require("mongodb").MongoClient;

let database;

const connect = async () => {
  const client = await MongoClient.connect("mongodb://localhost:20717/");
  database = await client.db("onlineshop");
};

const getDb = async () => {
  if (!database) {
    throw { message: "this connect is wrong" };
  }
  return database;
};

module.exports = {
  connect: connect,
  getDb: getDb,
};
