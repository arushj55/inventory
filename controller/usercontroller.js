const User = require("../model/user.model")
const bcrypt = require("bcrypt");


class UserController{
    
    registeruser = (req,res,next) =>{
        let data= req.body;
        bcrypt.hash(req.body.password, 10).then((hashed) => {
            data.password = hashed;

            let user= User(data);

            user.save((err,suc)=>{
                if(err){
                    console.log(err);
                    res.json({
                        result:null,
                        status: false,
                        msg:"error while entering data..."
                    })
                }
                else{
                    res.json({
                        result:suc,
                        status: true,
                        msg:"User registered successfully..."
                    })
                }
            })
    })
    }

getUserById = (req, res, next) => {
    let id = req.params.id;
    User.findById(id)
    .then((user) => {
        res.json({
            result: user,
            status: true,
            msg: "User fetched successfully."
        })
    })
    .catch((err) => {
        res.json({
            result: err,
            status: false,
            msg: "Error while fetching user"
        })
    })
}

getAllUsers = (req, res, next) => {
    User.find({})
    .then((users) => {
        res.json({
            result: users, 
            status: true, 
            msg: "All users fetched"
        })
    })
    .catch((err) => {
        res.json({
            result: err, 
            status: false, 
            msg: "Problem while fetching the data"
        })
    })
}

updateUserById = (req, res, next) => {
    let data = req.body;
    User.updateOne({
            _id: req.params.id
        }, {
            $set: data
    })
    .then((success) => {
        res.json({
            result: data,
            status: true,
            msg: "User updated successfully."
        })
    }) 
    .catch((err) => {
        next({
            status: 400,
            msg: err
        });
    })

}

deleteUserById = (req, res, next) => {
    // User.findByIdAndDelete(req.params.id)
    User.deleteOne({
        _id: req.params.id
    })
    .then((success) => {
        if(success.deletedCount > 0){
            res.json({
                result: success,
                status: true,
                msg: "User deleted successfully"
            })
        } else {
            res.json({
                result: success,
                status: true,
                msg: "User not found"
            })
        }
    }) 
    .catch((error) => {
        next({
            status: 400,
            msg: error
        })
    })
}

}

module.exports = UserController;