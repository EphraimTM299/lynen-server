import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const {objectId} = mongoose.Schema;

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
   
    category: {
        type: objectId, ref: 'Category'
    },
   
}, {timestamps: true})

const Laundry = mongoose.model('Laundry', LaundrySchema);


export default DryClean;