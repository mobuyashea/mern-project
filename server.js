const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const models = require("./models");
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;

//連結MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("連結到mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

//任何跟此路徑有關的都要先經過auth
app.use("/api/user", authRoute);

//course route應該被jwt保護
//如果request header裡面沒有jwt,則被視為是unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);
//只有登入系統的人才能去新增或註冊課程

//forheroku
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//不要用到port3000,要跟react錯開
app.listen(port, () => {
  console.log("後端伺服器聆聽在port8080...");
});
