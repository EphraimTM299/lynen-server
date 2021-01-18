const User = require( '../models/User.js')
const Cart = require( '../models/Cart.js')
const Profile = require('../models/Profile')
const Coupon = require('../models/Coupon')
const Laundry = require('../models/Laundry')
const Order = require('../models/Order')
const asyncHandler = require( "express-async-handler");
const slugify = require( 'slugify')
const moment = require('moment')

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
  
let userCart = await Cart.findOne({orderedBy: req.user._id})
const {laundry, coupon, cartTotal, totalAfterDiscount} = userCart
const { weight, perfumed, iron, clothes, instructions, address, pickup} = laundry
let cost
if(totalAfterDiscount) {
  cost = totalAfterDiscount
} else {
  cost = cartTotal
}

// const {weight, wprice, perfumed, iron, clothes, instructions, address,pickup} = req.body;

  const createWash = new Laundry({weight, perfumed, cost, iron})

  if(clothes) {
    clothes.forEach(c => createWash.clothes.push(c))
  }
 

const newWash = await createWash.save()


const newOrder = await Order.create({discount: totalAfterDiscount, coupon, laundry: newWash._id, instructions, orderedBy: req.user._id, address, pickup: new Date(pickup)})

 if(newOrder) {
   userCart.remove()
  return res.status(201).json({success: true, message: 'Order created successfully'})
} else {
  return res.status(500).json({success: false, error: 'Failed to create order'}) 
}
})

exports.addToCart = asyncHandler(async(req, res) => {
  let total;
const {weight, wprice, perfumed, iron, clothes, instructions, address,pickup} = req.body[0];

let w = Number(weight)
if(iron) {
  total = (w * 35) + (w * 15)
} else {
  total = (w * 35) 
}

let hasCart = Cart.findOne({ orderedBy: req.user._id})
if(hasCart) {
hasCart.updateOne({laundry: {weight, perfumed, iron, address, pickup: new Date(pickup), instructions, clothes}, orderedBy: req.user._id, cartTotal: total}).then(() => {
  return res.json({ok: true})
})
}else {
  const cart = await Cart.create({laundry: {weight, perfumed, iron, address, pickup: new Date(pickup), instructions, clothes}, orderedBy: req.user._id, cartTotal: total})

if(cart) {
  return res.json({ok: true})
} else {
  return res.status(500).json({success: false, error: 'Failed to save cart'}) 
}

}


})

exports.getUserCart = asyncHandler(async(req, res) => {

  let cart = await Cart.findOne({orderedBy: req.user._id})
if(cart) {

  if(cart.coupon) {
    const validCoupon = await Coupon.findOne({name: cart.coupon})
    let currentDate = moment()
    let notExpired = moment(validCoupon.expiry).isBefore(currentDate)
    if(!notExpired) cart.totalAfterDiscount = null
    cart.save().then((saved => res.json(saved)))
  } else {
    return res.json(cart)
  }


} else {
  return res.status(500).json({success: false, error: 'Failed to get user cart'}) 
}

})


exports.emptyCart = asyncHandler(async(req, res) => {

  let cart = await Cart.findOneAndRemove({orderedBy: req.user._id})
if(cart) {
  return res.json(cart)
} else {
  return res.status(500).json({success: false, error: 'Failed to get user cart'}) 
}

})


exports.applyCouponToCart = asyncHandler(async(req, res) => {
  
 
  const { coupon } = req.body

  const validCoupon = await Coupon.findOne({name: coupon})

  if(validCoupon) {

    // check coupon expiry
    let currentDate = moment()
   
    let notExpired = moment(validCoupon.expiry).isSameOrAfter(currentDate)

    if(notExpired) {
      let cart = await Cart.findOne({orderedBy: req.user._id})

      let totalAfterDiscount = (cart.cartTotal  - (cart.cartTotal * (validCoupon.discount / 100)) ).toFixed(2)
      
      cart.coupon = coupon;
      cart.totalAfterDiscount = totalAfterDiscount;
      cart.save().then((saved => res.json(saved)))
    } else {
      return res.json({success: false, message: 'Coupon has expired'})
    }
 

    
  } else {
    return res.json({success: false, error: 'Invalid coupon'})
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