const User = require( '../models/User.js')
const Profile = require('../models/Profile')
const Laundry = require('../models/Laundry')
const Order = require('../models/Order')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')

exports.basket = asyncHandler(async(req, res) => {
  const {basket} = req.body
 
    res.json('Working well')
})



exports.createProfile = asyncHandler(async(req, res) => {
  
const {phone, mobile, primaryAddress, secondaryAddress} = req.body
 const newProfile = await Profile.create({phone, mobile, primaryAddress, secondaryAddress, user: req.user._id})
 if(newProfile) {
  return res.status(201).json({success: true, message: 'Profile created successfully'})
} else {
  return res.status(401).json({success: false, error: 'Failed to create new profile'}) 
}
})


exports.createOrder = asyncHandler(async(req, res) => {
  
const {weight, wprice, perfumed, iron, clothes, instructions, address,pickup} = req.body;

  const createWash = new Laundry({weight, perfumed, cost: wprice, iron})

  if(clothes) {
    clothes.forEach(c => createWash.clothes.push(c))
  }
 

const newWash = await createWash.save()


const newOrder = await Order.create({laundry: newWash._id, instructions, orderedBy: req.user._id, address, pickup: new Date(pickup)})

 if(newOrder) {
  return res.status(201).json({success: true, message: 'Order created successfully'})
} else {
  return res.status(500).json({success: false, error: 'Failed to create order'}) 
}
})


exports.me = asyncHandler(async(req, res) => {
  
  const myProfile = await Profile.findOne({user: req.user._id})

 if(myProfile) {
  return res.json(myProfile)
} else {
  return res.status(500).json({success: false, error: 'Failed to load profile data'}) 
}
})


exports.getOrder = asyncHandler(async(req, res) => {
  
 
    const myOrder = await Order.find({orderedBy: req.user._id, orderStatus: { $ne: 'Completed' }}).populate({path: 'orderedBy', select: 'fullName email -_id'}).populate({path: 'laundry'}).sort([['createdAt', 'desc']])
 
    if(myOrder) {
      return res.json(myOrder)
    } else {
      return res.status(500).json({success: false, error: 'Failed to load order data'}) 
    }
   
  
  
  })

exports.getCompleteOrders = asyncHandler(async(req, res) => {
  
 
    const myOrders = await Order.find({orderedBy: req.user._id}).where('orderStatus', 'Completed').populate({path: 'orderedBy', select: 'fullName email -_id'}).populate({path: 'laundry'})
 
    if(myOrders) {
      return res.json(myOrders)
    } else {
      return res.status(500).json({success: false, error: 'Failed to load order data'}) 
    }
   
  
  
  })
exports.getOrderHistory = asyncHandler(async(req, res) => {
  
 
    const myOrders = await Order.find({orderedBy: req.user._id}).populate({path: 'orderedBy', select: 'fullName email -_id'}).populate({path: 'laundry'})
 
    if(myOrders) {
      return res.json(myOrders)
    } else {
      return res.status(500).json({success: false, error: 'Failed to load order data'}) 
    }
   
  
  
  })