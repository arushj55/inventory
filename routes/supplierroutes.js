const router = require("express").Router();
const SupplierController = require("../controller/suppliercontroller")
const suppliercltr = new SupplierController;
const upload = require('../middleware/uploader.middleware')

router.route('/')
    .post(suppliercltr.registerSupplier);

    router.get("/:id", suppliercltr.getSupplierById)

    router.put("/:id", upload.none(),suppliercltr.updateSupplierbyid)
    
    router.delete("/:id", suppliercltr.deleteSupplierById)
    
    router.get("/", suppliercltr.getAllSuppliers)


module.exports =  router;