const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const couponSchema = Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, 'Name is required'],
        minlength: [6, 'Too short'],
        maxlength: [18, 'Too long'],

       
    },
    expiry: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
}, {timestamps: true});


const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon;

