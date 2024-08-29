const formModel = require('../models/formModel');
const {createCustomError} = require('../errors/custom-error')
const userModel = require('../models/userModel');
const PANCardModel = require('../models/PANCardModel');
const AadhaarCardModel = require('../models/AadhaarCardModel');
const { sendMail } = require('../helpers/mailer');
const jwt = require('jsonwebtoken');

let panverify=false,aadharverify=false;

const mailSend = async(req,res,aadharNum)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.decode(token);
        const Email = decoded?.email;
        const user = await AadhaarCardModel.findOne({ 'Anum': aadharNum });
        if(panverify && aadharverify)
        {
            const msg = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Congratulations, ${user.Name}!</h2>
                    <p>We are thrilled to inform you that your KYC verification on KAVACH has been successfully completed!</p>
                    <p>Thank you for providing all the necessary information and for your patience during the process.</p>
                    <p><strong>Important Reminder:</strong></p>
                    <ul>
                        <li>Please ensure that all the fields in future forms match exactly with the details on your ID.</li>
                        <li>Avoid using unnecessary white spaces in your inputs to prevent any discrepancies.</li>
                    </ul>
                    <p>If you have any questions or need further assistance, feel free to reach out to our support team at your.kavach@gmail.com🛡️. We are here to help you!</p>
                    <p>Welcome aboard, and thank you for choosing KAVACH!</p>
                    <p>Best regards,</p>
                    <p>The KAVACH Team</p>
                </div>
                `;
                await sendMail(Email,'🔍 Your KYC Verification Results are In! Click to See Your Status', msg);
        }
        else
        {
            formModel.deleteOne({'Aadhar': user.Anum});
            const msg = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Hey there! Unverified User,</h2>
                    <p>Thank you for completing the KYC process on KAVACH. We appreciate your patience and cooperation.</p>
                    <p>After careful review, we regret to inform you that your KYC verification was unsuccessful.</p>
                    <p><strong>Reason:</strong> The verification was unsuccessful due to a mismatch in the details provided with your documents.</p>
                    <p>If you believe this is an error or if you have any questions, please do not hesitate to reach out to our support team at your.kavach@gmail.com🛡️. We are here to help you with any concerns you may have.</p>
                    <p><strong>Important Instructions:</strong></p>
                    <ul>
                        <li>Ensure that all the fields in the form match exactly with the details on the ID being uploaded(Including spaces).</li>
                        <li>Ensure that the document uplaoded is bright, clear and properly cropped.</li>
                        <li>Ensure that the uploaded Aadhaar card image has only the front face of the card and not both.</li>
                    </ul>
                    <p>Thank you for your understanding and cooperation.</p>
                    <p>Best regards,</p>
                    <p>The KAVACH Team</p>
                </div>
            `;
            await sendMail(Email,'🔍 Your KYC Verification Results are In! Click to See Your Status', msg);
        }
    }
    catch (error) {
        console.log("Sorry Bro");
        console.log(error);
        return ;
    }
    
}

const AadhaarPANfill = async(req,res,next)=>{
    const {Anum,Pnum,Name,Gender,DOB} = req.body;
    const newAadhaarCard = {
        "Anum": Anum,
        "Name": Name,
        "Gender": Gender,
        "DOB": DOB
    };
    const newPANCard = {
        "Pnum": Pnum,
        "Name": Name,
        "Gender": Gender,
        "DOB": DOB
    };
    const user1 = await AadhaarCardModel.create(newAadhaarCard);
    const user2 = await PANCardModel.create(newPANCard);
    res.status(201).send({msg:'Data sent Successfully', user1, user2});
}

const extractEmailFromToken = (token) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.decode(token);
        const email = decoded?.email;
        return email;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const formFill = async(req,res,next)=>{
    const {FullName,FatherName,Gender,MaritalS,DoB,Nationality,StreetAddress1,City,State,Zip,Country,Pan,Aadhar} = req.body;
    if(!FullName)
    {
        return next(createCustomError('Please Enter the Full Name!',400));
    }
    if(!FatherName)
    {
        return next(createCustomError('Please Enter the Father Name!',400));
    }
    if(!Gender)
    {
        return next(createCustomError('Please Enter the Gender!',400));
    }
    if(!MaritalS)
    {
        return next(createCustomError('Please Enter the Marital Status!',400));
    }
    if(!DoB)
    {
        return next(createCustomError('Please Enter the Date of Birth!',400));
    }
    if(!Nationality)
    {
        return next(createCustomError('Please Enter the Nationality!',400));
    }
    if(!StreetAddress1)
    {
        return next(createCustomError('Please Enter the Address!',400));
    }
    if(!City)
    {
        return next(createCustomError('Please Enter the City!',400));
    }
    if(!State)
    {
        return next(createCustomError('Please Enter the State!',400));
    }
    if(!Country)
    {
        return next(createCustomError('Please Enter the Country!',400));
    }
    if(!Zip)
    {
        return next(createCustomError('Please Enter the ZIP Code!',400));
    }
    if(!Aadhar)
    {
        return next(createCustomError('Please Enter the Aadhar Number!',400));
    }
    if(!Pan)
    {
        return next(createCustomError('Please Enter the PAN ID!',400));
    }
    const existingUser1 = await formModel.findOne({Aadhar});
    const existingUser2 = await formModel.findOne({Pan});
    if(existingUser1 || existingUser2)
    {
        return next(createCustomError('User already applied for KYC!', 400));
    }
    const user = await formModel.create(req.body);
    res.status(201).send({msg:'Applied for KYC Successfully', user});
}

const receiveAadhaar = async (req,res,next)=>{
        try {
            const data = req.body;
            console.log('Data received:', data);
            res.status(200).json({ status: 'success', message: 'Aadhaar Data received and processed successfully', data });
            const cond1 = await formModel.findOne({ 'Aadhar': data['Aadhar No'] });
            const cond2 = await AadhaarCardModel.findOne({ 'Anum': data['Aadhar No'] });
            let aadharNum = data['Aadhar No'];
            if(cond1 && cond2)
            {
                aadharverify=true;
            }
            mailSend(req,res,aadharNum);
        } catch (error) {
            console.error('Error receiving data:', error);
            res.status(500).json({ status: 'error', message: 'Failed to process Aadhaar data' });
        }
}

const receivePAN = async (req,res,next)=>{
        try {
            const data = req.body;
            console.log('Data received:', data);
            
            res.status(200).json({ status: 'success', message: 'PAN Data received and processed successfully', data });
            const cond1 = await formModel.findOne({ 'Pan': data['PAN'] });
            const cond2 = await PANCardModel.findOne({ 'Pnum': data['PAN'] });
            if(cond1 && cond2)
            {
                panverify=true;
            }
        } catch (error) {
            console.error('Error receiving data:', error);
            res.status(500).json({ status: 'error', message: 'Failed to process PAN data' });
        }
}


module.exports = { formFill,receiveAadhaar,receivePAN,AadhaarPANfill };