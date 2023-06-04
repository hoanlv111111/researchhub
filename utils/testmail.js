const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD
    }
});

send();

async function send() {
    const result = await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: 'hoangminh.hn011@gmail.com',
        subject: 'Hello World',
        text: 'Hello World'
    });

    console.log(JSON.stringify(result, null, 4));
}
