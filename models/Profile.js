import mongoose from 'mongoose'

const { Schema } = mongoose;
const {objectId} = mongoose.Schema;

const profileSchema = new Schema({
	
		
	address: { type: String, required: true },
		
    user: {type: objectId, ref: 'User'},
	
	phone: {
		type: String,
		required: [ true, 'Please add a contact number' ],
		match: [ /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Please add a valid phone number' ]
	},
	
	// role: {
	// 	type:  String ,
	// 	enum: [ 'admin', 'manager', 'client' ],
	// 	default: 'client'
	// },
	

	
}, {timestamps: true});



const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
