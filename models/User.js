const mongoose = require( 'mongoose')
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');
const crypto = require( 'crypto');
const dotenv = require( 'dotenv')
dotenv.config();

const { Schema } = mongoose;


const userSchema = new Schema({
	
	// lastName: { type: String, required: true },
	// firstName: { type: String, required: true },
	fullName: { type: String, required: true },

	active: { type: Boolean, default: false },
		
	
	
	email: {
		type: String,
		unique: true,
		required: [ true, 'Please add an email' ],
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
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

	referralCode: {
		type: String,
		unique: true
	},

	
	
	
	resetPasswordToken: String,
	resetPasswordExpire: Date,

	
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});


// userSchema.virtual('fullName').get(function() {
// 	return `${this.firstName} ${this.lastName}`
// })

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
	return jwt.sign({ id: this._id, name: this.fullName}, process.env.JWT_SECRET, {
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

	// Set to expire in 10mins
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};



const User = mongoose.model('User', userSchema);

module.exports = User;
