const nodemailer = require('nodemailer')

const sendMail = ({from, to, subject, text, html}) => {
    let transporter = nodemailer.createTransport({
        host: 
    })
}


module.exports = sendMail;