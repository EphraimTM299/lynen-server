import ErrorResponse from '../utils/errorResponse.js';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';


export const create = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)
    if(newProduct) {
        return res.status(201).json({success: true, message: 'New Product created'})
    } else {
        throw new ErrorResponse('Failed to create new product',401) 
    }
})