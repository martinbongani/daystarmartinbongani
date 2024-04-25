const mongoose = require("mongoose");

const babyRegistrationSchema = new mongoose.Schema({
    firstName:{
      type:String,
      trim:true  
    },
    lastName:{
        type:String,
        trim:true
    },
    dob:{
        type:Date,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    fatherName:{
        type:String,
        trim:true
    },
    fatherDeceased:{
        type:String,
        trim:true
    },
    motherDeceased:{
        type:String,
        trim:true
    },
    guardianName:{
        type:String,
        trim:true
    }

});

module.exports = mongoose.model("BabyRegister", babyRegistrationSchema)