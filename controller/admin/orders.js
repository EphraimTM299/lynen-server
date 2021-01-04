const Order = require( '../../models/Order.js')
const Profile = require( '../../models/Profile.js')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')

exports.listOrders = asyncHandler(async(req, res) => {
    const {sort, order, page} = req.body
    const currentPage = page || 1
    const perPage = 20
  const orders = await Order.find({})
                            .populate({ path: 'laundry', select: 'weight cost iron perfumed category' })
                            .populate({ path: 'orderedBy', select: 'fullName email' })
                            .skip((currentPage - 1) * perPage)
                            .sort([[sort, order]])
                            .limit(perPage)
  if(orders) {
    res.json(orders)
} else {
    res.status(400).json({success: false, message: 'Listing orders failed'});
// throw new Error("Listing orders failed");
}
  
})

exports.customerProfile = asyncHandler(async(req, res) => {
    
    const customerProfile = await Profile.findOne({ user: req.params.customerId})
    if(customerProfile) {
        res.json(customerProfile)
    } else {
        res.status(400).json({success: false, error: 'Failed to fetch customer details'});
    
    }
   

})

exports.create = asyncHandler(async(req, res) => {
    const {name, image} = req.body
    const newUser = await Order.create({name, image, slug: slugify(name)})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new Order failed");
    }
   

})
exports.read = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newUser = await Order.create({name, expiry, discount})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})
exports.update = asyncHandler(async(req, res) => {
    const {name, expiry, discount} = req.body
    const newUser = await Order.create({name, expiry, discount})
    if(newUser) {
        res.json(newUser)
    } else {
        res.status(400);
    throw new Error("Create new coupon failed");
    }
   

})


exports.remove = asyncHandler(async(req, res) => {
 
    const deleted = await Order.findByIdAndDelete(req.params.couponId)
  
    if(deleted) {
        res.json(deleted)
    } else {
        res.status(400);
    throw new Error("Delete coupon failed");
    }

})