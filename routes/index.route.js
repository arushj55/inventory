const userroutes= require("./userroutes");
const supplierroutes = require("./supplierroutes");
const productroutes = require("./productroutes");
const authroutes = require("./authroute");
const orderroutes = require("./orderroute");
const contactroute = require("./contactroute");
const paymentroute = require("./paymentroutes");
const otproute = require("./otproute");
const express = require("express");


const app = express();

app.use("/auth",authroutes);
app.use("/user",userroutes);
app.use("/supplier",supplierroutes);
app.use("/product",productroutes);
app.use("/order",orderroutes);
app.use("/contact",contactroute);
app.use("/payment",paymentroute);
app.use("/otp",otproute);

module.exports = app;