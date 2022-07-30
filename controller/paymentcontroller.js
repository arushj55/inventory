const Payment = require("../model/payment.model");
const OrderController = require("./ordercontroller")
const OrderCltr = new OrderController;
class PaymentController{
    createPayment = (req, res, next) => {
        let data = req.body;
          data.cheque_number = Date.now();
          data.due_amount = data.total_amount - data.paid_amount;
          data.total_amount = data.total_amount - data.paid_amount;
        let payment = Payment(data);
          console.log(payment)
            payment.save((err,suc)=>{
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
                        msg:"payment inserted successfully..."
                    })
                }
            })
        
    }

    Listall= (req,res,next)=>{
        Payment.find()
        .then((succ)=>{
            res.json({
                result: succ,
                status:true,
                msg:"data fetched successfully"
            })
        })
        .catch((err)=>{
            console.error(err);
            next({
                statuscode:400,
                msg: "Error while fetching data"
            })

        })
    }

    getpaymentbyid= (req,res,next)=>{
        Payment.findById({_id: req.params.id})
        .then((succ)=>{
            res.json({
                result: succ,
                status:true,
                msg:"data fetched successfully"
            })
        })
        .catch((err)=>{
            console.error(err);
            next({
                statuscode:400,
                msg: "Error while fetching data"
            })

        })
    }


    updatepaymentbyid= (req,res,next)=>{
        let data =req.body;
        Payment.updateOne({_id: req.params.id},{$set:data},(err,succ)=>{
            if(err){
                console.log(err);
                next({
                    statuscode:400,
                    msg: "Error while updating data"
                })
            }
            else{
                console.log(succ);
                res.json({
                    result:succ,
                    status: true,
                    msg:"Successfully data updated"
                }) 
            }
        })
    }

    deletepaymentbyid= (req,res,next)=>{
            Payment.deleteOne({_id: req.params.id},(err,succ)=>{
            if(err){
                next({
                    statuscode:400,
                    msg: "Error while deleting data"
                })
            }
            else{
                res.json({
                    result:succ,
                    status: true,
                    msg:"Successfully transaction deleted"
                })
            }
        })
    }
}

module.exports = PaymentController;
