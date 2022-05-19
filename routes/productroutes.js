const router = require("express").Router();
const ProductController = require("../controller/productcontroller")
const Productcltr = new ProductController;
const upload = require("../middleware/uploader.middleware")
router.route('/')
    .post(upload.none(),Productcltr.insertProduct)
    .get(Productcltr.Listallproduct);



module.exports =  router;