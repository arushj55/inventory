const router = require("express").Router()
const UserController = require("../controller/usercontroller");
const UserCltr = new UserController
const upload = require('../middleware/uploader.middleware')
router.route('/')
    .post(UserCltr.registeruser);

router.get("/:id", UserCltr.getUserById)

router.put("/:id",upload.none(),UserCltr.updateUserById)

router.delete("/:id", UserCltr.deleteUserById)

router.get("/", UserCltr.getAllUsers)


module.exports = router;