const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const orderSchema = new Schema({
 
    dryclean:  {type: ObjectId, ref: 'DryClean'},
    laundry:  {type: ObjectId, ref: 'Laundry'},
    household:  {type: ObjectId, ref: 'Household'},
    orderId: {type: Number, unique: true, index: true},
     
    pickup: {
        type: Date,
         required: true,
    },
    // dropoff: {
    //     type: Date,
    //      required: true,
    // },
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
            'Confirmed',
            'Out For Delivery',
            'Completed'
        ]
    },
   
    orderedBy: {
        type: ObjectId, ref: 'User'
    },
   
}, {timestamps: true})



orderSchema.plugin(AutoIncrement, {inc_field: 'orderId', start_seq: 1000})

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;
