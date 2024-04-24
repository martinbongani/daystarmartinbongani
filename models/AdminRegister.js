const mongoose = require('mongoose');
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
    }


});

module.exports = mongoose.model('AdminRegister', adminRegistrationSchema)