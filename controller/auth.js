import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv'
dotenv.config();
// import sendEmail from '../utils/sendEmail');
import crypto from 'crypto';

const register = asyncHandler(async (req, res, next) => {
	
	const { email, fullName, password, confirmPassword } = req.body;

	const existingUser = await User.findOne({email})

	if(existingUser) {
		return next(new ErrorResponse('User with provided email already exists!', 422));
	}

	if(password !== confirmPassword) {
		return next(new ErrorResponse('Passwords do not match', 422));
	}

	// Create user
	const user = await User.create({
		fullName,
		email,
		password,
		// address: ' ',
		// phone: ' '
		
	});

	sendTokenResponse(user, 200, res);
});

const login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email and password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Find user
	const user = await User.findOne({
		email
	}).select('+password');

	if(user === null) {
		return res.status(401).json({ success: false, error: 'Invalid credentials user does not exist'})
	}

	if (!user) {
		return next(new Error('Invalid credentials', 401));
	}

	//Check password match
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return res.status(401).json({ success: false, error: 'Invalid credentials'})
		// return next(new ErrorResponse('Invalid credentials', 401));
    }
    const token = user.getSignedJwtToken();
    res.status(200).json({
        email: user.email,
        name: user.fullName,
        role: user.role,
        address: user.address,
		token,
		
	});
	// sendTokenResponse(user, 200, res);
});

const logout = asyncHandler(async (req, res, next) => {
	// res.cookie('token', 'none', {
	// 	expires: new Date(Date.now() + 10 * 1000),
	// 	httpOnly: true
	// })

	res.status(200).json({
		success: true,
		data: {}
	})
	
});

const me = async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if(user == undefined || null) {
	 next(new Error("Admin resource. Access denied"))
        
	}

	res.status(200).json({
		success: true,
		data: user
	});
};

// const forgotPassword = asyncHandler(async (req, res, next) => {
// 	const user = await User.findOne({ email: req.body.email });

// 	if (!user) {
// 		return next(new ErrorResponse('There is no user with that email', 404));
// 	}

// 	// Get reset token
// 	const resetToken = user.getResetPasswordToken();

// 	await user.save({ validateBeforeSave: false });

// 	// create reset url
// 	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

// 	const message = `
// 	You are receiving this email because you (or someone else)
// 	has requested the reset of a password.
// 	Please make a PUT request to: \n\n ${resetUrl}`;

// 	try {
// 		await sendEmail({
// 			email: user.email,
// 			subject: 'Password reset token',
// 			message
// 		});
// 		res.status(200).json({ success: true, data: 'Email sent' });
// 	} catch (error) {
// 		console.log(error);
// 		user.resetPasswordToken = undefined;
// 		user.resetPasswordExpire = undefined;

// 		await user.save({ validateBeforeSave: false });

// 		return next(new ErrorResponse('Email could not be sent', 500));
// 	}
// });

const resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

const updateDetails = asyncHandler(async (req, res, next) => {
	const fieldsToUpdate = {
		name: req.body.name,
		email: req.body.email
	};

	const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		data: user
	});
});
const updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	if (!await user.matchPassword(req.body.currentPassword)) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// Get token from  ode, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	// res.status(statusCode).cookie('token', token, options).json({
	// 	success: true,
	// 	token
    // });
    
	res.status(statusCode).json({
		success: true,
		token
	});
};


export { register, login, logout, updatePassword, updateDetails, me}