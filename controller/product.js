const ErrorResponse = require( '../utils/errorResponse.js');
const Product = require( '../models/Product.js');
const asyncHandler = require( 'express-async-handler');


exports.create = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)
    if(newProduct) {
        return res.status(201).json({success: true, message: 'New Product created'})
    } else {
        throw new ErrorResponse('Failed to create new product',401) 
    }
})