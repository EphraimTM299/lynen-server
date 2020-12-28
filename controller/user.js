import User from '../models/User.js'
import asyncHandler from "express-async-handler";
import slugify from 'slugify'

export const basket = asyncHandler(async(req, res) => {
  const {basket} = req.body
  console.log('inside basket controller')
  console.log(req.user)
    res.json('Working well')
})
