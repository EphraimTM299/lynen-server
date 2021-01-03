const User = require( '../../models/User.js')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')

exports.list = asyncHandler(async(req, res) => {
  const users = await User.find({}).sort({createdAt: -1})
  if(users) {
    res.json(users)
} else {
    res.status(400).json({success: false, message: 'Listing Users failed'});
// throw new Error("Listing Users failed");
}
  

})

exports.create = asyncHandler(async(req, res) => {
    const {name, image} = req.body
    const newUser = await User.create({name, image, slug: slugify(name)})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new User failed");
    }
   

})
exports.read = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newUser = await User.create({name, expiry, discount})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})
exports.update = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newUser = await User.create({name, expiry, discount})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})


exports.remove = asyncHandler(async(req, res) => {
 
    const deleted = await User.findByIdAndDelete(req.params.couponId)
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400);
    throw new Error("Delete coupon failed");
    }

})