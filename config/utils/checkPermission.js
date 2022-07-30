const { UnauthorizeError } = require("../errors");

const checkPermission = (requestUser, resourceUser)=>{
    if (requestUser.userId === resourceUser.toString()) {
        return;
    }

    throw new UnauthorizeError("Not authorized to access this resource")
}

module.exports = checkPermission;