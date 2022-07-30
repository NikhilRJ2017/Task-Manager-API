const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../config/errors');
const { createTokenUser, attachCookiesToResponse } = require('../config/utils');
const User = require('../models/User');

//**************** Get current logged in user *****************/
const getCurrentUser = (req, res)=>{
    res.status(StatusCodes.OK).json({
        message: "Success",
        user: req.user
    });
}

//***************** Update user details ****************/
const updateUser = async (req, res) => { 
    const { email, name } = req.body;
    if (!email || !name) {
        throw new BadRequestError("Please provide both email and name");
    }

    const { userId } = req.user;
    const user = await User.findOneAndUpdate({ _id: userId }, { email, name }, { runValidators: true, new: true });

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({
        message: "Success",
        user: tokenUser
    })

}

//****************** Update user password ******************/
const updatePassword = async (req, res) => { 
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError("Please provide old and new password both");
    }

    const { userId } = req.user;

    const user = await User.findById(userId);

    const isOldPasswordMatch = user.comparePasswords(oldPassword);
    if (!isOldPasswordMatch) {
        throw new BadRequestError("Please provide valid old password");
    }

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({
        message: "Success"
    })
}

module.exports = {
    getCurrentUser,
    updateUser,
    updatePassword
}