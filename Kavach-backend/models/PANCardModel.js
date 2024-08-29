const mongoose = require('mongoose')

const PANCardSchema = new mongoose.Schema(
    {
        Pnum:{
            type:String,
            required:true,
            unique:true,
            maxlength:12
        },
        Name:{
            type:String,
            required:true,
        },
        DOB:{
            type:Date,
            required:true,
        }
    }
);

module.exports = mongoose.model('PANCard', PANCardSchema);