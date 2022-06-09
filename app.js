const express = require("express");
const app = express();

const authRouter = require("./routers/auth.router");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.listen(3000);
