const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, 'Category name is required'],
        maxlength: [32, 'Too long'],

       
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    image: {
        type: String,
    },
  
}, {timestamps: true});


const Category = mongoose.model('Category', categorySchema)

module.exports = Category;

