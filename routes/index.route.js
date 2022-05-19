const userroutes= require("./userroutes");
const supplierroutes = require("./supplierroutes");
const productroutes = require("./productroutes");
const authroutes = require("./authroute");
const express = require("express");

const app = express();

app.use("/auth",authroutes);
app.use("/user", userroutes);
app.use("/supplier",supplierroutes);
app.use("/product",productroutes);

module.exports = app;