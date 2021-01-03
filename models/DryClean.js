const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {objectId} = mongoose.Schema;


const itemSchema = new Schema({
    image: String,
    name: String,
    price: {type: Number, required: ['Dry cleaning item price required', true]}
}, {timestamps: true})

const dryCleanSchema = new Schema({
 
    items: [itemSchema],
  
   
    category: {
        type: objectId, ref: 'Category'
    },
   
}, {timestamps: true})

const DryClean = mongoose.model('DryClean', dryCleanSchema);


module.exports = DryClean;