const router = require("express").Router();
const ContactController = require("../controller/contactcontroller")
const Contactcltr = new ContactController;
const upload = require("../middleware/uploader.middleware")
router.route('/')
    .post(upload.none(),Contactcltr.createContact)
    .get(Contactcltr.Listall);

router.route('/:id')
    .get(upload.none(),Contactcltr.getorderbyid)
    .delete(Contactcltr.deleteorderbyid)


module.exports =  router;