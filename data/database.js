const MongoClient = require("mongodb").MongoClient;

let database;

const connect = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("onlineshop");
};

const getDb = () => {
  if (!database) {
    throw {
      message: "This connect wrong",
    };
  }
  return database;
};

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
