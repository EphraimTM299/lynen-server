



exports.mongoErrorHandler = (dbError, req, res, next) => {
console.log('error middleware', dbErro)

        const normalizedErrors = [];
        const errorField = 'errors';

        if(dbError && dbError.hasOwnProperty(errorField) && dbError.name === 'ValidatorError') {
            for (let property in errors) {
                normalizedErrors.push({title: property, detail: errors[property].message})
            }
        } else {
            normalizedErrors.push({title: 'Db Error', detail: 'Ooops, something went wrong!'})
        }
        return res.status(422).json({errors: normalizedErrors})
    
    next()
}