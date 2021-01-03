const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const productSchema = new Schema({
 
    title: {
        type: String,
        trim: true,
        required: true,
       
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    perfumed: {
        type: Boolean,
        default: 'false'
    },
  
    // price: {
    //     type: Number,
    //     required: true,
    //     trim: true,
    //     maxlength: 32
    // },
 
    category: [{
        type: ObjectId,
        ref: 'Category'
    }],
    items: [{
        type: ObjectId,
        ref: 'ProductItems'
    }
        
    ]
    
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);


module.exports = Product;