const mongoose = require('mongoose')

const AadharCardSchema = new mongoose.Schema(
    {
        Anum:{
            type:String,
            required:true,
            unique:true,
            maxlength:14
        },
        Name:{
            type:String,
            required:true,
        },
        Gender:{
            type:String,
            required:true,
        },
        DOB:{
            type:Date,
            required:true,
        }
    }
);

module.exports = mongoose.model('AadharCard', AadharCardSchema);