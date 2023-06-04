const mailer = require('nodemailer');
const mailConfig = require('../config/mail.config');
require('dotenv/config');

exports.sendMail = async (to, subject, html) => {
    try {
        const transporter = mailer.createTransport({
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD,
            },
        });

        const mailOptions = {
            from: mailConfig.FROM_ADDRESS,
            to: to,
            subject: subject,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log("Error sending email:", error);
        return error;
    }
}