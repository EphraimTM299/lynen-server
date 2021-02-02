const Product = require( '../../models/Product.js')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')

exports.listProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({}).sort({createdAt: 1}).populate({path: 'category', select: 'name -_id'})
  if(products) {
    res.json(products)
} else {
    res.status(400).json({success: false, message: 'Listing Products failed'});
// throw new Error("Listing Products failed");
}
  

})

exports.createProduct = asyncHandler(async(req, res) => {
    const {name, price, weight, category} = req.body
    const newProduct = await Product.create({name, price, weight, category})
    if(newProduct) {
        res.json(newProduct)
    } else {
        res.status(400).json({success: false, message: 'Create new Product failed'});
    }
   

})
exports.readProduct = asyncHandler(async(req, res) => {
    
    const product = await Product.findOne({slug: req.params.slug})
    if(product) {
        res.json(product)
    } else {
        res.status(400).json({success: false, message:"product not found"});
    }

})
exports.updateProduct = asyncHandler(async(req, res) => {
    let {name} = req.body
    const updated = await Product.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true})
    if(updated) {
        res.json(updated)
    } else {
        res.status(400).json({success: false, message:"Product update failed"});
    }
   

})


exports.removeProduct = asyncHandler(async(req, res) => {
 
    const deleted = await Product.findOneAndDelete({slug: req.params.slug})
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400).json({success: false, message: "Delete product failed"});
    }

})