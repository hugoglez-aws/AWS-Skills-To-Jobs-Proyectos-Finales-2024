const express = require("express");
const router = express.Router();
const { loginController, registerController, loginFromGoogle } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../valdiators/auth")
const uploadMiddleware = require("../utils/handleStorage");


router.post("/register", uploadMiddleware.single("Photo"), validatorRegister, registerController);

router.post("/login", uploadMiddleware.none(), validatorLogin, loginController);

router.post("/googleLogin", loginFromGoogle);

module.exports = router;