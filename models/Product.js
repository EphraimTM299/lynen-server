const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const productSchema = new Schema({
 
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
       
    },
    image: {
        type: String,
    },
    
    weight: {
        type: Number,
        required: true,
    },
    // perfumed: {
    //     type: Boolean,
    //     default: 'false'
    // },
  
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
 
    category: {
        type: ObjectId,
        ref: 'Category'
    },
   
        
    
    
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;