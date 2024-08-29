const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//* Password must have one upper, one lower, one special and one numeric character
const passwordValidator = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(value);
};

//* Phone number constraint
const phoneNumberValidator = (value) => {
    const regex = /^\d{10}$/; // Exactly 10 digits
    return regex.test(value);
};

//* User DB Schema
const userSchema = new mongoose.Schema({
        Fname:{
            type:String,
            require:[true,'Please enter the first Name'],
        },
        Mname:{
            type:String,
            require:[true,'Please enter the middle Name'],
        },
        Lname:{
            type:String,
            require:[true,'Please enter the last Name'],
        },
        Prefname:{
            type:String,
            default:'Kavach-user',
        },
        Email:{
            type:String,
            require:[true,'Please enter the E-mail address'],
            unique:true,
            validate: [validator.isEmail,'Please enter a valid E-mail'],
        },
        is_verified:{
            type:Boolean,
            default:false,
        },
        Phone:{
            type:String,
            require:[true,'Please enter the Phone number'],
            validate:[phoneNumberValidator,'Please enter a valid Phone Number'],
        },
        Password:{
            type:String,
            require:[true,'Please enter the Password'],
            minlength:8,
            validate:[passwordValidator,'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character']
        }
    },
    {Timestamp:true}
);

//* Hashing the Password
userSchema.pre('save', async function(){
    if(!this.isModified)
        return;
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password,salt);
})

//* Compare password for validation
userSchema.methods.comparePass = async function(userPassword){
    return await bcrypt.compare(userPassword,this.Password);
}

//* create JWT
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
userSchema.methods.createJWT = async function(){
    return jwt.sign(
        {
            userID:this._id,
            email:this.Email,
        },
        process.env.JWT_SECRET,
        {expiresIn:'3h'}
    );
}

module.exports = mongoose.model('Users',userSchema);