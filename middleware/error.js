const ErrorResponse = require( '../utils/errorResponse.js');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
// console.log('error handler errors ====>', error)


	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = `${err.errmsg}`;
		return res.status(error.statusCode || 500).json({title: err._message, errors: [message]})
        // error = new ErrorResponse(message, 400);
        
	}

	// Mongoose validation error
	if (error.errors) {
        let errorArray = [];
		
        const keys = Object.keys(err.errors)
        const message = Object.values(err.errors).map((val) => val.message);
        for(let i = 0; i < message.length;i++) {
            errorArray.push({title: keys[i], message:  message[i].replace('Path', '')})
        }
		// error = new ErrorResponse(errorArray, 400);
	
		return res.status(error.statusCode || 500).json({title: err._message, errors: errorArray})
	}

	return res.status(error.statusCode || 500).json({
		success: false,
		error:  err || 'Server Error'
	});
	
};

module.exports = errorHandler;