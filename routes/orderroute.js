const router = require("express").Router();
const OrderController = require("../controller/ordercontroller");
const OrderCltr = new OrderController;
const upload = require("../middleware/uploader.middleware");
router.route('/')
.post(upload.none(),OrderCltr.createOrder)
.get(OrderCltr.Listall);

router.route('/:id')
.put(upload.none(),OrderCltr.updateorderbyid)
.get(upload.none(),OrderCltr.getorderbyid)
.delete(OrderCltr.deleteorderbyid);


module.exports =  router;