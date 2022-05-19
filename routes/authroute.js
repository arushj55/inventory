const router = require('express').Router()
const AuthController = require("../controller/authcontroller");
const authCtrl = new AuthController();
const isLoggedIn = require("../middleware/custom.middleware")


router.post("/login", authCtrl.login)
router.post('/isAdmin',isLoggedIn, (req, res, next) => {
    res.json({
        result: req.auth_user,
        status: 200,
        msg: "user"
    })
})
module.exports = router;