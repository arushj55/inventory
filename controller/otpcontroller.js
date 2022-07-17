const Otp = require("../model/otp.model");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
class OtpController {
    sendEmail = (req, res, next) => {
        let value = req.body;
        User.findOne({ email: value.email })
            .then((succ) => {
                if (succ) {
                    let otpCode = Math.floor((Math.random() * 10000) + 1);
                    value.code = otpCode;
                    value.expiresIn = new Date().getTime() + 300 * 1000;
                    let otp = Otp(value);

                    otp.save()
                        .then((succ) => {
                            res.json({
                                result: succ,
                                status: true,
                                msg: "please check your email"
                            })
                        })
                        .catch((err) => {
                            res.json({
                                result: err,
                                status: false,
                                msg: "Error while sending email"
                            })
                        })

                    this.mailer(value.email, value.code)

                }
                else {
                    console.log("Invalid")
                }

            })

            .catch((err) => {
                console.log("User email not valid" + err)
            })


    }

    mailer = (email, otp) => {
        var nodemailer = require('nodemailer')
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secureConnection: false,
            auth: {
                user: 'joshi.arush55@gmail.com',
                pass: 'zqmzwihxybybotgz'
            }
        });

        var mailOptions = {
            from: 'joshi.arush55@gmail.com',
            to: email,
            subject: 'OTP Code to reset passwros',
            text: "Your OTP CODE: " + otp + " to reset your password............ Thank You!!!",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error.message);
            }
            console.log('Email Sent: ' + info);
        });
    }


    changePassword = (req, res, next) => {
        let data = req.body;
        Otp.find({ code: data.code })
            .then((succ) => {
                if (succ) {

                    let currentTime = new Date().getTime();
                    let diff = data.expiresIn - currentTime;
                    if (diff < 0) {
                        res.json({
                            stats: false,
                            msg: "Token expired"
                        })
                    }
                    else {
                        User.findOne({ email: data.email })
                            .then((succ) => {
                                let value = succ;
                                console.log("value",req.body.password)
                                bcrypt.hash(req.body.password, 9)
                                .then((hashed) => {
                                    value.password = hashed;
                                    
                                    console.log(value)
                                    let user= User(value);
                        
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

                                
                            })
                            .catch((err) => {
                                console.log(err)
                            })


                    }
                }
                else {
                    console.log("Error")
                }

            })

            .catch((err) => {
                console.log("error" + err)
            })
    }

    getEmail = (req, res, next) => {
        Otp.find()

            .then((succ) => {
                res.json({
                    result: succ,
                    status: true,
                    msg: "data fetched successfully"
                })
            })
            .catch((err) => {
                console.error(err);
                next({
                    statuscode: 400,
                    msg: "Error while fetching data"
                })

            })
    }
}


module.exports = OtpController;
