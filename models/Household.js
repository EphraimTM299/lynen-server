import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const {objectId} = mongoose.Schema;


const itemSchema = new Schema({
    image: String,
    name: String,
    price: {type: Number, required: ['Household item price required', true]}
}, {timestamps: true})

const householdSchema = new Schema({
 
    items: [itemSchema],
    
    category: {
        type: objectId, ref: 'Category'
    },
   
}, {timestamps: true})

const Household = mongoose.model('Household', householdSchema);


export default Household;