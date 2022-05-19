const Product = require("../model/product.model")


class ProductController{


    insertProduct= (req,res,next) =>{
        let data = req.body;

            let product = Product(data);

            product.save((err,suc)=>{
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
                        msg:"product inserted successfully..."
                    })
                }
            })
    }
    Listallproduct= (req,res,next)=>{
        Product.find()
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

    getproductbyid= (req,res,next)=>{
        Product.findById({_id: req.params.id})
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

        Product.updateOne({_id: req.params.id},{$set:data},(err,succ)=>{
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

    deleteproductbyid= (req,res,next)=>{
        Product.deleteOne({_id: req.params.id},(err,succ)=>{
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

    


module.exports = ProductController;