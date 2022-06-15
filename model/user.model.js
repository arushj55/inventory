const mongoose= require('mongoose');

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
   password: {
       type:String,
       required:true
    },
    full_name: {
        type:String,
        required:true
    },
   address: {
    type: String
    },
   phone: {
       type:Number
    },
   email: {
       type:String,
       required: true,
       unique: true

    },
    role:{
        type:String,
        enum:['admin','staff','retailer'],
        default:'staff'
    }
},{timestamp:true});

const user = mongoose.model('User',UserSchema);
module.exports= user;