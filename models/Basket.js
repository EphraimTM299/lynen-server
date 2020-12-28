import mongoose from 'mongoose'
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema


const basketSchema = new Schema({
    dryclean: {type: ObjectId, ref: 'DryClean'},
    laundry: {type: ObjectId, ref: 'DryClean'},
    household: {type: ObjectId, ref: 'Household'},
    grandTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: {type: ObjectId, ref: 'User'}
}, {timestamps: true})

const Basket = mongoose.model('Basket', basketSchema)

export default Basket;