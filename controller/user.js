const User = require( '../models/User.js')
const Profile = require('../models/Profile')
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

exports.me = asyncHandler(async(req, res) => {
  
  const myProfile = await Profile.findOne({user: req.user._id})

 if(myProfile) {
  return res.json(myProfile)
} else {
  return res.status(500).json({success: false, error: 'Failed to load profile data'}) 
}
})
