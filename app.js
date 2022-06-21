const express = require("express");
const path = require("path");
const app = express();
const db = require("./data/database");
const csurf = require("csurf");
const session = require("express-session");

const csrfToken = require("./middlewares/csrfToken");
const checkAuth = require("./middlewares/checkAuth");
const errorHandler = require("./middlewares/errorHandler");
const cartIn = require("./middlewares/cartIn");

const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "onlineshop",
  collection: "session",
});

const authRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin.router");
const customerRouter = require("./routers/customer.router");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname + "/public")));

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(csurf());
app.use(csrfToken);
app.use(checkAuth);
// app.use(cartIn);

app.use("/customer", customerRouter);
app.use("/admin", adminRouter);
app.use(authRouter);

app.use(errorHandler);

db.connectToDatabase().then(() => {
  app.listen(3000);
});
