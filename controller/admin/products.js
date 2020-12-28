import Product from '../../models/Product.js'
import asyncHandler from "express-async-handler";
import slugify from 'slugify'

export const listProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({}).sort({createdAt: -1})
  if(products) {
    res.json(products)
} else {
    res.status(400).json({success: false, message: 'Listing Products failed'});
// throw new Error("Listing Products failed");
}
  

})

export const createProduct = asyncHandler(async(req, res) => {
    const {name, image} = req.body
    const newProduct = await Product.create({name, image, slug: slugify(name)})
    if(newProduct) {
        res.json(newProduct)
    } else {
        res.status(400);
    throw new Error("Create new Product failed");
    }
   

})
export const readProduct = asyncHandler(async(req, res) => {
    
    const product = await Product.findOne({slug: req.params.slug})
    if(product) {
        res.json(product)
    } else {
        res.status(400).json({success: false, message:"product not found"});
    }

})
export const updateProduct = asyncHandler(async(req, res) => {
    let {name} = req.body
    const updated = await Product.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true})
    if(updated) {
        res.json(updated)
    } else {
        res.status(400).json({success: false, message:"Product update failed"});
    }
   

})


export const removeProduct = asyncHandler(async(req, res) => {
 
    const deleted = await Product.findOneAndDelete({slug: req.params.slug})
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400).json({success: false, message: "Delete product failed"});
    }

})