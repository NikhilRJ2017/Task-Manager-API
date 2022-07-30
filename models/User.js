const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: [3, "Name too short"],
        maxLength: [30, "Name too long"]
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        }
    },

    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "Password too short"]
    }
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePasswords = async function (userEnteredPassword) {
    const isMatch = await bcrypt.compare(userEnteredPassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema);

module.exports = User;

