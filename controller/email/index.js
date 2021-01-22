// const sendMail = require( '../../utils/emailTemplate')
const sendMail = require( '../../services/email')

const asyncHandler = require( "express-async-handler");

const moment = require('moment')

exports.resetPassword = asyncHandler(async(req, res) => {
    sendMail({
        form: emailFrom,
        to: emailTo,
        subject: 'Welcome to Lynen',
        text: `${emailFrom} welcome`,
        html: require( '../../utils/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}`

        })
    })
})
