const asyncHandler = require( "express-async-handler");
const ErrorResponse = require( '../utils/errorResponse.js')
const jwt = require( 'jsonwebtoken');
const User = require( '../models/User.js')
const dotenv = require( 'dotenv')
dotenv.config();


exports.authCheck = asyncHandler(async (req, res, next) => {
	let token;

	// if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
	// 	token = req.headers.authorization.split(' ')[1];
	// }
	
	if (req.headers.authtoken) {
		
		token = req.headers.authtoken;
	
		
	}

	if (!token) {
		return res.status(401).json({success: false, message: 'Not authorized to access this route'})
		// return next(new ErrorResponse('Not authorized to access this route', 401));
	}
	
	// Verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
	
		req.user = await User.findById(decoded.id);
		
		next();
	} catch (error) {
		
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}
});

exports.adminCheck = asyncHandler(async (req, res, next) => {
    const {email} = req.user

    const adminUser = await User.findOne({email})

    if(adminUser.role !== 'admin') {
        res.status(401).json({success: false, message: 'Admin resource. Access denied'});
       
        // res.status(401).json({
        //     err: 'Admin resource. Access denied'
        // })
    } else {
        next()
    }
   
    
})

exports.managerCheck = asyncHandler(async (req, res, next) => {
    const {email} = req.user

    const managerUser = await User.findOne({email})

    if(managerUser.role !== 'manager') {
        res.status(401).json({success: false, message: 'Manager resource. Access denied'});
       
    } else {
        next()
    }
   
    
})


