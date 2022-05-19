const mongoose =require('mongoose');
const {dbUrl,dbName} = require('./config/db.config');
const conurl= dbUrl+"/"+dbName;

mongoose.connect(conurl,{autoIndex:true},(error,sucess)=>{
    if(!error){
        console.log("Datbase connected successfuly");
    }
    else{
        console.log("Error while connecting database");
    }
})
