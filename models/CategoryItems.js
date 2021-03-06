const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;


const categoryItemSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
       
    },
    image: {
        type: String,
    },
    category: [{
        type: ObjectId,
        ref: 'Category'
    }],
});

const CategoryItem = mongoose.model('CategoryItem', categoryItemSchema);

module.exports = CategoryItem;



