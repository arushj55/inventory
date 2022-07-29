const isAdmin = (req, res, next) => {
    if(req.auth_user.role == 'admin'){
        next();
    } else {
        next({
            statusCode: 403,
            msg: "Unauthorized"
        })
    }
}

const isRetailer = (req, res, next) => {
    if(req.auth_user.role == 'retailer'){
        next();
    } else {
        next({
            statusCode: 403,
            msg: "Unauthorized"
        })
    }
}

const isStaff = (req, res, next) => {
    if(req.auth_user.role == 'staff'){
        next();
    } else {
        next({
            statusCode: 403,
            msg: "Unauthorized"
        })
    }
}

const isStaffAdmin = (req, res, next) => {
    console.log(req.body)
    if(req.auth_user.role == 'admin' || req.auth_user.role == 'staff'){
        next();
    } else {
        next({
            statusCode: 403,
            msg: "Unauthorized"
        })
    }
}

module.exports = {isAdmin, isRetailer, isStaff, isStaffAdmin};
