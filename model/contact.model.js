const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    message:{
        type:String
    }
}, {
    timestamps: true
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;