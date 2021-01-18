const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const cartSchema = Schema({
    laundry: {
        weight: String,
        perfumed: Boolean,
        iron: Boolean,
        clothes: Array,
        instructions: String,
        address: String,
        pickup: Date
    },
    coupon: String,
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  
}, {timestamps: true});


const cart = mongoose.model('cart', cartSchema)

module.exports = cart;

