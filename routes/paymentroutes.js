const router = require("express").Router();
const PaymentController = require("../controller/Paymentcontroller")
const Paymentcltr = new PaymentController;
const upload = require("../middleware/uploader.middleware")
router.route('/')
    .post(upload.none(),Paymentcltr.createPayment)
    .get(Paymentcltr.Listall);

router.route('/:id')
    .put(upload.none(),Paymentcltr.updatepaymentbyid)
    .get(upload.none(),Paymentcltr.getpaymentbyid)
    .delete(Paymentcltr.deletepaymentbyid)


module.exports =  router;