import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;


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

export default CategoryItem;



