const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
const {objectId} = mongoose.Schema;


const clothesSchema = new Schema({
    name: {type: String, required: true},
    quantity: { type: Number,required: true}
})

const laundrySchema = new Schema({
 
    weight: {
        type: Number,
        required: ['Weight of clothes is required']
    },
    cost: {
        type: Number,
        required: true,
    },
    perfumed: {
        type: Boolean,
        required: true,
    },
    ironing: {
        type: Number,
        required: true,
    },
    instructions: String,
    clothes: [clothesSchema],
   
    category: {
        type: String,
        default: 'Wash Dry Fold'
    },
   
}, {timestamps: true})

const Laundry = mongoose.model('Laundry', laundrySchema);


module.exports = Laundry;