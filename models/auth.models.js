const db = require("../data/database");
const bcrypt = require("bcrypt");

class User {
  constructor(email, password, name, address) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.address = address
  };

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 14);
    await db.getDb().collection("member").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  };

  async checkAlreadySignup() {
    const AlreadyEmail = await db
      .getDb()
      .collection("member")
      .findOne({ email: this.email });
    return AlreadyEmail;
  };

  async login() {
    const user = await db.getDb().collection("member").findOne({ email: this.email });
    if (!user) {
      return;
    }
  
    const checkPassword = await bcrypt.compare(this.password, user.password);
    if (!checkPassword) {
      return;
    }
  
    return user;
  };
}

module.exports = User