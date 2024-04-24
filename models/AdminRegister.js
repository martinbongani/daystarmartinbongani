const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const adminRegistrationSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    role:{
        type:String,
        trim:true
    }


});

adminRegistrationSchema.plugin(passportLocalMongoose, {
    usernameField:"email"
})
module.exports = mongoose.model("AdminRegister", adminRegistrationSchema)