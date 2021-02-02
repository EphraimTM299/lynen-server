const Category = require( '../../models/Category.js')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify');
const Product = require('../../models/Product.js');

exports.listCategories = asyncHandler(async(req, res) => {
  const category = await Category.find({}).sort({createdAt: 1})
  if(category) {
    res.json(category)
} else {
    res.status(400).json({success: false, message:"Listing category failed"});
}
  

})

exports.createCategory = asyncHandler(async(req, res) => {
    const {name, image} = req.body
    const newCategory = await Category.create({name})
    if(newCategory) {
        res.json(newCategory)
    } else {
        res.status(400).json({success: false, message: "Create new category failed"});
    }
   

})
exports.readProductCategory = asyncHandler(async(req, res) => {
  
   let category = await Category.findOne({name: req.params.name}).exec()
  
    let products = await Product.find({category: category._id}).select('name weight price').exec()
   
    if(products) {
        res.json(products)
    } else {
        res.status(400).json({success: false, message:"Products not found"});
    }
   

})

exports.readCategory = asyncHandler(async(req, res) => {
   
    const category = await Category.findOne({slug: req.params.slug})
    if(category) {
        res.json(category)
    } else {
        res.status(400).json({success: false, message:"category not found"});
    }
   

})
exports.updateCategory = asyncHandler(async(req, res) => {
    let {name} = req.body
    const updated = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true})
    if(updated) {
        res.json(updated)
    } else {
        res.status(400).json({success: false, message:"Category update failed"});
    }
   

})


exports.removeCategory = asyncHandler(async(req, res) => {
  
    const deleted = await Category.findByIdAndDelete(req.params.id)
  
    if(deleted) {
        res.json({success: true, message: 'Coupon deleted successfully'})
    } else {
        res.status(400).json({success: false, message: 'Deleting Coupon failed'});
    }

})