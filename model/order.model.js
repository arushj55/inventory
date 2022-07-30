const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    bill_number:{
        type:Number,
        required:true,
        unique:true
    },
    supplier: {
        type: mongoose.Types.ObjectId,
        ref: "Supplier",
       
    },
    retailer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required:true
    },
    status:{
        type:String,
        default:'sale'
    },
    state:{
        type:String,
        enum:['delivered','pending'],
        default:'pending'
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sub_total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;