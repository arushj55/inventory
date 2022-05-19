const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price_unit: {
        type: Number,
        required: true,
        min: 0
    },
    quantity:{
        type: Number,
        required: true,
        min: 0
    },
    supplier:{
        type:mongoose.Types.ObjectId,
        ref:"Supplier"
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;