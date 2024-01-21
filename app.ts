import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { expressjwt } from "express-jwt";

import BookRouter from "./routes/book";
import CategoryRouter from "./routes/category";
import UserRouter from "./routes/users";
import BorrowRouter from "./routes/borrows";
import LoginRouter from "./routes/login";
import LogoutRouter from "./routes/logout";
import { SECRET_KEY } from "./config";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

require("./model/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 验证,除login页面外其他路径请求如果JWT不对就返回401
app.use(
  expressjwt({ secret: SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/api/login"],
  })
);

app.use("/api/books", BookRouter); // 匹配url
app.use("/api/categories", CategoryRouter); // 匹配url
app.use("/api/users", UserRouter); // 匹配url
app.use("/api/borrows", BorrowRouter); // 匹配url
app.use("/api/login", LoginRouter); // 匹配url
app.use("/api/logout", LogoutRouter); // 匹配url

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.listen("3005", () => {
  console.log("server start at 3005");
});

module.exports = app;
