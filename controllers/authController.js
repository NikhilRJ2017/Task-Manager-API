const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticateError } = require('../config/errors');
const { attachCookiesToResponse, createTokenUser } = require('../config/utils');
const User = require('../models/User');

//******************** Register a user ********************/
const register = async (req, res) => { 
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({
        message: "Success",
        user: tokenUser
    })
}

//******************* Login a user ********************/
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide both email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticateError("Invalid credentials");
    }

    const isPasswordMatch = await user.comparePasswords(password)
    if (!isPasswordMatch) {
        throw new UnauthenticateError("Invalid credentials");
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({
        message: "Success",
        user: tokenUser
    });
}

//******************* Logout a user ******************/
const logout = async (req, res) => { 
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 10 * 1000), //?cookie disappear in 10 seconds
    }

    res.cookie('token', 'logout', cookieOptions);
    res.status(StatusCodes.OK).json({
        message: "Success"
    })
}

module.exports = {
    register,
    login,
    logout
}