const userroutes= require("./userroutes");
const supplierroutes = require("./supplierroutes");
const productroutes = require("./productroutes");
const authroutes = require("./authroute");
const orderroutes = require("./orderroute");
const express = require("express");

const app = express();

app.use("/auth",authroutes);
app.use("/user", userroutes);
app.use("/supplier",supplierroutes);
app.use("/product",productroutes);
app.use("/order",orderroutes);


module.exports = app;