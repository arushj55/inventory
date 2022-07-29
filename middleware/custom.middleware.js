const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
    // TODO: Check user loggedin
    let token;
    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }
    if(req.headers['x-xsrf-token']){
        token = req.headers['x-xsrf-token'];
    }

    if(req.query['token']){
        token = req.query['token'];
    }

    if(!token){
        next({
            msg: "Unauthorized",
            statusCode: 403
        })
    }
    token = token.split(" ");
    if(token.length > 1){
        token = token[1];
    } else {
        token = token[0];
    }

    //console.log(token);

    

    let data = jwt.verify(token, process.env.JWT_SECRET);
   
    if(!data){
        next({
            msg: "token mismatched or broken or expired",
            statusCode: 403
        })
    }
    let user_id = data.User_id;
    //console.log(user_id);
    User.findById(user_id)
    .then((updated_user) => {
        if(!updated_user){
            next({
                msg: "User not found",
                statusCode: 403
            })
        } else {
            req.auth_user = updated_user;
            next();
        }
    })
    .catch((error) => {
        next({
            msg: "Token does not exists",
            statusCode: 403
        })
    })
    // console.log(data);



   
}

module.exports = isLoggedIn;

// multer