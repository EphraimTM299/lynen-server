const Order = require( '../../models/Order')
const Profile = require( '../../models/Profile')

const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')

exports.listOrders = asyncHandler(async(req, res) => {
    const {sort, order, page, filter} = req.body
    const search = {}
    if(filter) {
        search = {orderStatus: filter}
    }
    console.log('from list orders controller', search)
    const currentPage = page || 1
    const perPage = 20
  const orders = await Order.find(search)
                            .populate({ path: 'laundry', select: 'weight cost iron perfumed category clothes' })
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

exports.listFilteredOrders = asyncHandler(async(req, res) => {
    const {sort, order, page, filter} = req.body
  
    console.log('from list filtered orders controller req.body ==> ', req.body)
    const currentPage = page || 1
    const perPage = 20
  const orders = await Order.find({orderStatus: filter})
                            .populate({ path: 'laundry', select: 'weight cost iron perfumed category clothes' })
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



exports.orderStatus = asyncHandler(async(req, res) => {
    const {orderId, orderStatus} = req.body
   
  const updated = await Order.findByIdAndUpdate(orderId, {orderStatus}, {new: true})
                            
  if(updated) {
    res.json(updated)
} else {
    res.status(400).json({success: false, message: 'Listing updated failed'});
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