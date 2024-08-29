const { createCustomError } = require('../errors/custom-error')
const userModel = require('../models/userModel');
const { sendMail } = require('../helpers/mailer');

//*  Register user
const newUser = async (req,res,next)=>{

    try{
        const {Fname,Mname,Lname,Email,Phone,Password,CPassword} = req.body;
        if(!Fname)
        {
            return next(createCustomError('Please Enter the First Name!',400));
        }
        if(!Mname)
        {
            return next(createCustomError('Please Enter the Middle Name!',400));
        }
        if(!Lname)
        {
            return next(createCustomError('Please Enter the Last Name!',400));
        }
        if(!Email)
        {
            return next(createCustomError('Please Enter the E-mail address!',400));
        }
        if(!Phone)
        {
            return next(createCustomError('Please Enter the Phone Number!',400));
        }
        if(!Password)
        {
            return next(createCustomError('Please Enter the Password!',400));
        }
        if(!CPassword)
        {
            return next(createCustomError('Please Enter the Confirm Password!',400));
        }
        if(Password!==CPassword)
        {
            return next(createCustomError('Password and Confirm Password do not match!',400))
        }
        const existingUser = await userModel.findOne({Email});
        if(existingUser)
        {
            return next(createCustomError('User Already Exists!', 400));
        }
        const user = await userModel.create(req.body);
        const token = await user.createJWT();

        const msg = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Welcome to KAVACH, ${user.Fname}!</h2>
                <p>Thank you for registering on our website. We are excited to have you on board as we work to revolutionize the KYC process with our advanced AI-powered solutions.</p>
                <p>Please verify your email by clicking the link below:</p>
                <p><a href="http://localhost:5000/api/v1/auth/verify-email?id=${user._id}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
                <p>If you have any questions or need assistance, feel free to reach out to our support team at narayan14478@gmail.com🛡️.</p>
                <p>Best regards,</p>
                <p>The KAVACH Team</p>
            </div>
            `
        await sendMail(Email,'Activate Your Shield! Verify Your Email with KAVACH', msg);
        
        res.status(201).send({msg:'User Registered Successfully', token});
    }
    catch (error) {
    if (error.name === 'ValidationError') {
        // Extract validation errors
        const errors = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ errors });
    }
    if (error.code === 11000) { // Duplicate key error (e.g., email already exists)
        return res.status(400).json({ errors: ['Email already exists!'] });
    }
    next(error);
}
};

//* Login user
const loginUser = async(req,res,next)=>{
        const {Email,Password} = req.body;
        if(!Email)
        {
            return next(createCustomError('Please Enter the E-mail address!',400));
        }
        if(!Password)
        {
            return next(createCustomError('Please Enter the Password!',400));
        }
        try 
        {
            const user = await userModel.findOne({Email});
            if(!user)
            {
                return next(createCustomError('User does not exist!', 404));
            }
            const isPassCorrect = await user.comparePass(Password);
            if(!isPassCorrect)
            {
                return next(createCustomError('Wrong Password, Enter again!',401));
            }
            if(user.is_verified==false)
            {
                return next(createCustomError('Unverified User!, Kindly complete your verification from the E-mail sent',401))
            }
            const token = await user.createJWT();
            res.status(200).json({msg:'User logged in Successfully',token});
        } 
        catch (error) {
            next();    
        }
};

const mailVerification = async (req, res) => {
    try {
        // Check if id query parameter exists
        if (!req.query.id) {
            return res.render('404', { message: 'Invalid request!' });
        }

        // Find user by ID
        const user = await userModel.findOne({ _id: req.query.id });
        
        // Check if user exists
        if (!user) {
            return res.render('mail-verification', { message: 'User not Found!' });
        }

        // Check if user is already verified
        if (user.is_verified) {
            return res.render('mail-verification', { message: 'Your mail has already been Verified!' });
        }

        // Update user verification status
        await userModel.findByIdAndUpdate(req.query.id, { $set: { is_verified: true } });

        // Render success message
        return res.render('mail-verification', { message: 'Mail has been verified Successfully!' });
        
    } catch (error) {
        console.error('Error during email verification:', error);
        return res.render('404', { message: 'An error occurred while verifying your email.' });
    }
};

module.exports = {newUser,loginUser,mailVerification};