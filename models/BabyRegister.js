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
    fatherEmail:{
        type:String,
        trim:true
    },
    fatherContact:{
        type:String,
        trim:true
    },
    fatherOccupation:{
        type:String,
        trim:true
    },
    motherName:{
        type:String,
        trim:true
    },
    motherDeceased:{
        type:String,
        trim:true
    },
    motherEmail:{
        type:String,
        trim:true
    },
    motherContact:{
        type:String,
        trim:true
    },
    motherOccupation:{
        type:String,
        trim:true
    },
    guardianName:{
        type:String,
        trim:true
    },
    guardianContact:{
        type:String,
        trim:true
    },
    guardianEmail:{
        type:String,
        trim:true
    },
    guardianOccupation:{
        type:String,
        trim:true
    },
    guardianRelationship:{
        type:String,
        trim:true
    },
    babyNumber:{
        type:String,
        trim:true
    },
    parentResponsibility:{
        type:String,
        trim:true
    },
    broughtBy:{
        type:String,
        trim:true
    },
    stayPeriod:{
        type:String,
        trim:true
    },
    arrivalTime:{
        type:String,
        trim:true
    },
    fee:{
        type:Number,
        trim:true
    },
    // sitter:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "SitterRegister"
    // },
    takenBy:{
        type:String,
        trim:true
    },
    departureTime:{
        type:String,
        trim:true
    },
    comment:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        default:"Present",
        enum:["Present", "Absent"],
    },

});

module.exports = mongoose.model("BabyRegister", babyRegistrationSchema)