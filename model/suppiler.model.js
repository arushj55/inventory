const mongoose= require('mongoose');

const SupplierSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   address: {
        type:String
    },
   phone: {
       type:Number
    },
   email: {
       type:String
    }
},{timestamp:true});

const supplier = mongoose.model('Supplier',SupplierSchema);
module.exports= supplier;