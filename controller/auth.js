const ErrorResponse = require( '../utils/errorResponse.js');
const User = require( '../models/User.js');
const asyncHandler = require( 'express-async-handler');
const dotenv = require( 'dotenv')
dotenv.config();
// const sendEmail = require( '../utils/sendEmail');
const crypto = require( 'crypto');

exports.register = asyncHandler(async (req, res, next) => {
	
	const { email, fullName, password, confirmPassword } = req.body;

	const existingUser = await User.findOne({email})

	if(existingUser) {
		return res.status(422).json({success: false, error: 'User with provided email already exists!'});
		// return next(new ErrorResponse('User with provided email already exists!', 422));
	}

	if(password !== confirmPassword) {
		return res.status(422).json({success: false, error: 'Passwords do not match'});
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

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email and password
	if (!email || !password) {
		res.status(400).json({success: false, error:'Please provide an email and password'});
	}

	// Find user
	const user = await User.findOne({
		email
	}).select('+password');

	if(user === null) {
		return res.status(401).json({ success: false, error: 'Invalid credentials user does not exist'})
	}

	if (!user) {
		res.status(401).json({success: false, error:'Invalid credentials'});
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

exports.logout = asyncHandler(async (req, res, next) => {
	// res.cookie('token', 'none', {
	// 	expires: new Date(Date.now() + 10 * 1000),
	// 	httpOnly: true
	// })

	res.status(200).json({
		success: true,
		data: {}
	})
	
});

exports.me = async (req, res, next) => {
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

exports.resetPassword = asyncHandler(async (req, res, next) => {
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


exports.updateDetails = asyncHandler(async (req, res, next) => {
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

exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// Check current password
	if (!await user.matchPassword(req.body.currentPassword)) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// Get token = require(  ode, create cookie and send response
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


