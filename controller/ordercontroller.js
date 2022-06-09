const Order = require("../model/order.model");
const product = require("../model/product.model");
class OrderController{
    createOrder = (req, res, next) => {
        let data = req.body;
        data.sub_total = data.price*data.quantity;

        let order = Order(data);

            order.save((err,suc)=>{
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
                        msg:"order inserted successfully..."
                    })
                }
            })
        
    }

    Listall= (req,res,next)=>{
        Order.find()
        .populate('supplier')
        .populate('retailer')
        .populate('product')
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

    getorderbyid= (req,res,next)=>{
        Order.findById({_id: req.params.id})
        .populate('supplier')
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


    updateproductbyid= (req,res,next)=>{
        let data =req.body;
        console.log("data",data)
        product.updateOne({_id: req.params.id},{$set:data},(err,succ)=>{
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

    deleteorderbyid= (req,res,next)=>{
            Order.deleteOne({_id: req.params.id},(err,succ)=>{
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
                    msg:"Successfully data deleted"
                })
            }
        })
    }
}

module.exports = OrderController;
