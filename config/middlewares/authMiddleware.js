const { UnauthenticateError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new UnauthenticateError("Authentication invalid");
    }

    try {
        const { name, userId } = isTokenValid({ token })
        req.user = {
            name: name,
            userId: userId
        }
        next();
    } catch (error) {
        throw new UnauthenticateError("Authentication invalid");
    }
}

module.exports = authenticateUser;