const Coupon = require( '../../models/Coupon.js')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')

exports.listCoupons = asyncHandler(async(req, res) => {
  const coupons = await Coupon.find({}).sort({createdAt: -1})
  if(coupons) {
    res.json(coupons)
} else {
    res.status(400).json({success: false, message: 'Listing Coupons failed'});
// throw new Error("Listing Coupons failed");
}
  

})

exports.createCoupon = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newCoupon = await Coupon.create({name, expiry, discount})
    if(newCoupon) {
        res.json(newCoupon)
    } else {
        res.status(400).json({success: false, message: 'Creating a new Coupon failed'})
        
    }
   

})
exports.readCoupon = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newCoupon = await Coupon.create({name, expiry, discount})
    if(newCoupon) {
        res.json(newCoupon)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})
exports.updateCoupon = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newCoupon = await Coupon.create({name, expiry, discount})
    if(newCoupon) {
        res.json(newCoupon)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})


exports.removeCoupon = asyncHandler(async(req, res) => {
 
    const deleted = await Coupon.findByIdAndDelete(req.params.couponId)
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400);
    throw new Error("Delete coupon failed");
    }

})