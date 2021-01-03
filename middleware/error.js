const ErrorResponse = require( '../utils/errorResponse.js');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = `${err.errmsg}`;
        error = new ErrorResponse(message, 400);
        
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
        let errorArray = [];
    
        const keys = Object.keys(err.errors)
        const message = Object.values(err.errors).map((val) => val.message);
        for(let i = 0; i < message.length;i++) {
            errorArray.push({[keys[i]]:  message[i]})
        }
		error = new ErrorResponse(errorArray, 400);
	}

	return res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error'
	});
	
};

module.exports = errorHandler;