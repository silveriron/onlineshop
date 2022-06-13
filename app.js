const express = require("express");
const app = express();
const db = require("./data/database");
const csurf = require("csurf");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrfToken = require("./middlewares/csrfToken");
const checkAuth = require("./middlewares/checkAuth");

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "onlineshop",
  collection: "session",
});

const authRouter = require("./routers/auth.router");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(csurf());
app.use(csrfToken);
app.use(checkAuth);

app.use(authRouter);

db.connectToDatabase().then(() => {
  app.listen(3000);
});
