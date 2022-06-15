const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
   bill_number:{
        type: Number,
        required:true
    },
    cheque_number:{
        type: Number,
        required:true
    },
    paid_by:{
        type:String,
        required:true,
    },
    total_amount:{
            type:Number,
            required:true
    },
   paid_amount:{
    type:Number,
    required:true
   },
   due_amount:{
    type:Number
   }
}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;