const mongoose = require("mongoose");

const sitterRegistrationSchema = new mongoose.Schema({
    sitterName:{
      type:String,
      trim:true  
    },
    sitterNumber:{
        type:String,
        trim:true
    },
    nationalId:{
        type:String,
        trim:true
    },
    address:{
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
    email:{
        type:String,
        trim:true
    },
    contact:{
        type:String,
        trim:true
    },
    educationLevel:{
        type:String,
        trim:true
    },
    religion:{
        type:String,
        trim:true
    },
    recommenderName:{
        type:String,
        trim:true
    },
    recommenderContact:{
        type:String,
        trim:true
    },
    nextOfKin:{
        type:String,
        trim:true
    },
    nextOfKinContact:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        default:"Available",
        enum:["Available", "Off"],
    },
    assignedBabies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"BabyRegister"
    }],
});

module.exports = mongoose.model("SitterRegister", sitterRegistrationSchema)