const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;


const clothesSchema = new Schema({
    id: Number,
    item: {type: String, required: true},
    itemCount: { type: Number,required: true}
})

const laundrySchema = new Schema({
 
    weight: {
        type: Number,
        required: ['Weight of clothes is required', true]
    },
    cost: {
        type: Number,
        required: true,
    },
    perfumed: {
        type: Boolean,
        required: true,
    },
    iron: {
        type: Boolean,
        required: ['Please specify ironing', true]
    },
    
    clothes: [clothesSchema],
   
    category: {
        type: String,
        default: 'Wash Dry Fold'
    },
   
}, {timestamps: true})

const Laundry = mongoose.model('Laundry', laundrySchema);


module.exports = Laundry;