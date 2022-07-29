const Supplier = require("../model/suppiler.model")


class SupplierController{


    registerSupplier = (req,res,next) =>{
        let data = req.body;
            let supplier = Supplier(data);

            supplier.save((err,suc)=>{
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
                        msg:"Supplier registered successfully..."
                    })
                }
            })
    }

    getSupplierById = (req, res, next) => {
        let id = req.params.id;
        Supplier.findById(id)
        .then((supplier) => {
            res.json({
                result: supplier,
                status: true,
                msg: "Supplier fetched successfully."
            })
        })
        .catch((err) => {
            res.json({
                result: err,
                status: false,
                msg: "Error while fetching supplier"
            })
        })
    }
    
    getAllSuppliers = (req, res, next) => {
        Supplier.find({})
        .then((supplier) => {
            res.json({
                result: supplier, 
                status: true, 
                msg: "All supplier fetched"
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
    
    updateSupplierbyid= (req,res,next)=>{
        
        Supplier.updateOne({_id: req.params.id},{$set:req.body},(err,succ)=>{
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
    
    deleteSupplierById = (req, res, next) => {
        // Supplier.findByIdAndDelete(req.params.id)
        Supplier.deleteOne({
            _id: req.params.id
        })
        .then((success) => {
            if(success.deletedCount > 0){
                res.json({
                    result: success,
                    status: true,
                    msg: "Supplier deleted successfully"
                })
            } else {
                res.json({
                    result: success,
                    status: true,
                    msg: "Supplier not found"
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


    


module.exports = SupplierController;