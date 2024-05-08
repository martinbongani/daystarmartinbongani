const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
    description:{
      type:String,
      trim:true  
    },
    transactionRef:{
        type:String,
        trim:true
    },
    amount:{
        type:Number,
        trim:true
    },
    classification:{
        type:String,
        trim:true
    },
    transactionDate:{
        type:Date,
        trim:true
    }
});

module.exports = mongoose.model("AccountsRegister", accountsSchema)