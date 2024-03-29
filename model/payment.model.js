const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
   bill_number:{
        type: Number,
        required:true
    },
    cheque_number:{
        type: Number,
        required:true,
        unique:true
    },
    paid_by:{
        type:String
    },
    paid_to:{
        type:String
    },
    total_amount:{
            type:Number,
            required:true
    },
    amount:{
        type:Number
    },
   paid_amount:{
    type:Number,
    required:true
   },
   due_amount:{
    type:Number
   },
   contact:{
    type:Number
   }
}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;