const router = require("express").Router();
const ProductController = require("../controller/productcontroller")
const Productcltr = new ProductController;
const upload = require("../middleware/uploader.middleware")
router.route('/')
    .post(upload.none(),Productcltr.insertProduct)
    .get(Productcltr.Listallproduct);

router.route('/:id')
    .put(upload.none(),Productcltr.updateproductbyid)
    .get(upload.none(),Productcltr.getproductbyid)
    .delete(Productcltr.deleteproductbyid)


module.exports =  router;