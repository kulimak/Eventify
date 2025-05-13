const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eventifyreset@gmail.com',
        pass: 'oiaa qssu bxob rzew '
    }
});

module.exports = transporter;