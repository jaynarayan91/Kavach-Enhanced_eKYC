const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Add this if you encounter certificate issues
    }
});

const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Mail Sent:', info.messageId);
    } catch (error) {
        console.log('Error sending email:', error.message);
    }
};

module.exports = { sendMail };
