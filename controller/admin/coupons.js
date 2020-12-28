import Coupon from '../../models/Coupon.js'
import asyncHandler from "express-async-handler";
import slugify from 'slugify'

export const list = asyncHandler(async(req, res) => {
  const users = await Coupon.find({}).sort({createdAt: -1})
  if(users) {
    res.json(users)
} else {
    res.status(400).json({success: false, message: 'Listing Coupons failed'});
// throw new Error("Listing Users failed");
}
  

})

export const create = asyncHandler(async(req, res) => {
    const {name, image} = req.body
    const newUser = await Coupon.create({name, image, slug: slugify(name)})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400).json({success: false, message: 'Creating a new Coupon failed'})
        
    }
   

})
export const read = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newUser = await Coupon.create({name, expiry, discount})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})
export const update = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newUser = await Coupon.create({name, expiry, discount})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})


export const remove = asyncHandler(async(req, res) => {
 
    const deleted = await Coupon.findByIdAndDelete(req.params.couponId)
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400);
    throw new Error("Delete coupon failed");
    }

})