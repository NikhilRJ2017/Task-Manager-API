const { StatusCodes } = require('http-status-codes');

//***************** Express's inbuilt error handler **************** */
const errorHandler = (err, req, res, next) => {
    
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, try again"
    }

    if(err.code && err.code === 11000){
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    //?mongoose validation error
    if(err.name === 'ValidationError'){
        customError.message = Object.values(err.errors).map((item)=>item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    //?mongoose cast error/syntax error
    if(err.name === 'CastError'){
        customError.message = `No item found with id : ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({
        message: customError.message
    });
}

module.exports = errorHandler;