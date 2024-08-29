const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    FullName:{
        type:String,
        require:[true,'Please enter the first Name'],
    },
    FatherName:{
        type:String,
        require:[true,"Please enter the Father's Name"],
    },
    Gender:{
        type:String,
        enum:['Male', 'Female', 'Others'],
        require:[true,'Please enter the Gender'],
    },
    MaritalS:{
        type:String,
        enum:['Single','Married','Prefer Not to Say'],
        require:[true,'Please enter your marital status'],
    },
    DoB:{
        type:Date,
        require:[true, 'Please enter your Date of Birth!'],
    },
    Nationality:{
        type:String,
        require:[true,'Please enter your Nationality!'],
    },
    //* Permanent Address Field
    StreetAddress1:{
        type:String,
        required:[true,'Please enter your Address!'],
    },
    StreetAddress2:{
        type:String,
    },
    City:{
        type:String,
        required:[true,'Please enter your City!'],
    },
    State:{
        type:String,
        required:[true,'Please enter your State!'],
    },
    Zip:{
        type:String,
        required:[true,'Please enter your ZIP Code!'],
        minlength:4,
        maxlength:10,
    },
    Country:{
        type:String,
        required:[true,'Please enter your Country!'],
    },
    Aadhar:{
        type:String,
        require:[true,'Please enter the Aadhar card number'],
        unique:true,
    },
    Pan:{
        type:String,
        require:[true, 'Please enter the PAN ID'],
        unique:true,
    }
});

module.exports = mongoose.model('FormDetails',formSchema);