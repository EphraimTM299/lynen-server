import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config();

const { Schema } = mongoose;


const userSchema = new Schema({
	
		fullName: { type: String, required: true },
		// address: { type: String, required: true },
		
	
	email: {
		type: String,
		unique: true,
		required: [ true, 'Please add an email' ],
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
	},
	phone: {
		type: String,
		// required: [ true, 'Please add a contact number' ],
		// match: [ /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Please add a valid phone number' ]
	},
	password: {
		type: String,
		select: false,
		required: [true, 'Please add a password'],
		minlength: [ 6, 'Password must be at least 6 characters' ]
	},
	role: {
		type:  String ,
		enum: [ 'admin', 'manager', 'client' ],
		default: 'client'
	},
	avatar: {
		type:  String ,
	
	},
	
	resetPasswordToken: String,
	resetPasswordExpire: Date,

	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Encrypt password
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT
userSchema.methods.getSignedJwtToken = function() {
	return jwt.sign({ id: this._id, name: this.fullName, role: this.role, email: this.email, address: this.address }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function() {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
