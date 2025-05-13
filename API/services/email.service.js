const transporter = require('../config/nodemailerConfig');

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'eventifyreset@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

module.exports = { sendEmail };