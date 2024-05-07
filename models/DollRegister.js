const mongoose = require("mongoose");

const dollRegistrationSchema = mongoose.Schema({
    dollName:{
        type:String,
        trim:true
    },
    quantity:{
        type:Number,
        trim:true
    },
    rate:{
        type:Number,
        trim:true
    },
    amount:{
        type:Number,
        trim:true
    },
    imageUpload:{
        type:Number,
        trim:true
    },
    description:{
        type:Number,
        trim:true
    },
    status:{
        type:String,
        default:"Available",
        enum:["Available", "Sold"],
    },
    dateOfPurchase:{
        type:Date,
        trim:true
    }
});

module.exports = mongoose.model("DollRegister", dollRegistrationSchema);