const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
const {objectId} = mongoose.Schema;

const orderSchema = new Schema({
 
    dryclean:  {type: objectId, ref: 'DryClean'},
    laundry:  {type: objectId, ref: 'Laundry'},
    household:  {type: objectId, ref: 'Household'},
     
    pickup: {
        type: Date,
         required: true,
    },
    dropoff: {
        type: Date,
         required: true,
    },
    address: {
        type: String,
        required: ['Order address required', true]

    },
    instructions: String,
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: 'Not Processed',
        enum: [
            'Not Processed',
            'Processing',
            'Dispatched',
            'Cancelled',
            'Completed'
        ]
    },
   
    orderedBy: {
        type: objectId, ref: 'User'
    },
   
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;