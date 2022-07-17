const router = require("express").Router();
const otpController = require("../controller/otpcontroller");
const otpCltr = new otpController;
const upload = require("../middleware/uploader.middleware");
router.post("/send-email",upload.none(),otpCltr.sendEmail)
router.get("/send-email",upload.none(),otpCltr.getEmail)

router.post("/reset-password",upload.none(),otpCltr.changePassword)

module.exports =  router;