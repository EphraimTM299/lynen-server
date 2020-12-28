import Order from '../models/Order.js'
import asyncHandler from "express-async-handler";


export const list = asyncHandler(async(req, res) => {
  const coupons = await Order.find({}).sort({createdAt: -1})
  if(coupons) {
    res.json(coupons)
} else {
    res.status(400);
throw new Error("Listing coupons failed");
}
  

})

export const create = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newOrder = await Order.create({name, expiry, discount})
    if(newOrder) {
        res.json(newOrder)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})


export const remove = asyncHandler(async(req, res) => {
 
    const deleted = await Order.findByIdAndDelete(req.params.couponId)
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400);
    throw new Error("Delete coupon failed");
    }

})