const nodemailer = require('nodemailer')

const sendMail = (options) => {

let mailConfig = {}
let sendGrid = {
    service: process.env.EMAIL_SERVICE,
    host: process.env.HOST,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
}


let smtpConfig = {
    // host: process.env.SMTP_HOST,
    // port: 2525,
    // secure: true, // use SSL
    // auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    // }
    host: 'mailhog',
    port: 1025
};

if(process.env.NODE_ENV === 'development') {
    mailConfig = smtpConfig
} else {
    mailConfig = sendGrid
}



    // let transporter = nodemailer.createTransport(smtpConfig)
    let transporter = nodemailer.createTransport(mailConfig);

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.verify(function(error, success) {
        if (error) {
             console.log(error);
        } else {
             console.log('Server is ready to take our messages');
        }
     });

    transporter.sendMail(mailOptions, function(err,info) {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })
}


module.exports = sendMail;