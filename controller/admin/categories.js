import Category from '../../models/Category.js'
import asyncHandler from "express-async-handler";
import slugify from 'slugify'

export const listCategories = asyncHandler(async(req, res) => {
  const category = await Category.find({}).sort({createdAt: -1})
  if(category) {
    res.json(category)
} else {
    res.status(400).json({success: false, message:"Listing category failed"});
}
  

})

export const createCategory = asyncHandler(async(req, res) => {
    const {name, image} = req.body
    const newCategory = await Category.create({name, image, slug: slugify(name)})
    if(newCategory) {
        res.json(newCategory)
    } else {
        res.status(400).json({success: false, message: "Create new category failed"});
    }
   

})
export const readCategory = asyncHandler(async(req, res) => {
   
    const category = await Category.findOne({slug: req.params.slug})
    if(category) {
        res.json(category)
    } else {
        res.status(400).json({success: false, message:"category not found"});
    }
   

})
export const updateCategory = asyncHandler(async(req, res) => {
    let {name} = req.body
    const updated = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true})
    if(updated) {
        res.json(updated)
    } else {
        res.status(400).json({success: false, message:"Category update failed"});
    }
   

})


export const removeCategory = asyncHandler(async(req, res) => {
  
    const deleted = await Category.findOneAndDelete({slug: req.params.slug})
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400).json({success: false, message: "Delete category failed"});
    }

})