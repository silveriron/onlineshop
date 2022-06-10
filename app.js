const express = require("express");
const app = express();
const db = require('./data/database')

const authRouter = require("./routers/auth.router");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static('./public'))

app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

db.connect().then(() => {
  app.listen(3000);
})

