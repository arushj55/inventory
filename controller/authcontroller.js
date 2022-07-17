
const mongodb = require("mongodb");

const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = require("../config/environment");

const bcrypt = require("bcrypt");

const generateToken = (payload) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}


class AuthController{

    login = (req, res, next) => {
        // db connect
        
        User.findOne({
            email: req.body.email,
            // password: req.body.password
        })
        .then((response) => {
            
            // password check 
           
            if(response){
                // validate password. 

                // bcrypt.compare()
                // .then()
                // .catch();   // async

                if(bcrypt.compareSync(req.body.password, response.password)){
                    // token generate 

                    // jwt, passport 
                    // json web token
                    // bearer token
                    
                    res.status(200).json({
                        result: {
                            User: response,
                            
                            token: generateToken({
                                User_id: response._id,
                                name: response.full_name,
                                email: response.email,
                                role: response.role
                            })
                        },
                        status: 200,
                        msg: "Login successfull"
                    })
                } else {
                    console.log(res)
                    next({
                        status: 400,
                        msg: "Credentials does not match"
                    })
                }


            } else {
                next({status: 400, msg:"User does not exists"})
            }
        })
        .catch((error) => {
            next({status: 400, msg:"Credentials does not match"})
        })
    
    }
    
}

module.exports = AuthController;