const mongoose= require('mongoose');

const OtpSchema= mongoose.Schema({
   email: {
       type:String
    },
   code:{
        type:String
    },
    expiresIn:{
        type:Number
    }
},{timestamp:true});

const user = mongoose.model('Otp',OtpSchema);
module.exports= user;