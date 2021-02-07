const mongoose = require( 'mongoose')

const { Schema } = mongoose;


const profileSchema = new Schema({
	
		
	primaryAddress: { type: String,
		//  required: true
		 },
	secondaryAddress: { type: String },
	avatar: { type: String},
		
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	
	phone: {
		type: String,
		// match: [ /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Please add a valid phone number' ]
	},

	mobile: {
		type: String,
		// required: [ true, 'Please add a contact number' ],
		// match: [ /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Please add a valid phone number' ]
	},

	points: {
		type: Number
	},

	referLink: String,
	
	referrals: [String]
	// role: {
	// 	type:  String ,
	// 	enum: [ 'admin', 'manager', 'client' ],
	// 	default: 'client'
	// },
	

	
}, {timestamps: true});



const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
