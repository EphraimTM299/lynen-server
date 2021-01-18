const User = require( '../../models/User')
const Order = require( '../../models/Order')
const Laundry = require( '../../models/Laundry')

const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')




exports.getUserCount = asyncHandler(async(req, res) => {
    let total = await User.find({role: 'client'}).estimatedDocumentCount().exec()
    res.json(total)
})

exports.getOrdersCount = asyncHandler(async(req, res) => {
    let total = await Order.find().estimatedDocumentCount().exec()
    res.json(total)
})

exports.getPendingOrdersCount = asyncHandler(async(req, res) => {
    let total = await Order.find({ orderStatus: { $ne: 'completed' } }).estimatedDocumentCount().exec()
    res.json(total)
})

exports.getTotalSalesAmount = asyncHandler(async(req, res) => {


    let total = await 
    
    Laundry.aggregate(
        [
          {
            $group: {
              _id: "$category",
              total: {
                $sum: "$cost"
              }
            }
          }
        ],
       
      );
      res.json(total)

})
