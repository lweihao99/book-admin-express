import { User } from "./model";
import BookRouter from "./routes/book";
import CategoryRouter from "./routes/category";
import express, { Request, Response, NextFunction } from "express";

var createError = require("http-errors");
// var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const req = require("express/lib/request");
require("./model/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/books", BookRouter); // 匹配url
app.use("/api/categories", CategoryRouter); // 匹配url

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.listen("3005", () => {
  console.log("server start at 3005");
});

module.exports = app;
