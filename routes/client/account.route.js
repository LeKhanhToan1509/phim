const router = require("express").Router();
const loginController = require("../../controller/client/login.controller");

router.get("/login", loginController.login);
router.post("/login", loginController.postLogin);
router.get("/register", loginController.register);
router.post("/register", loginController.userRegister);
router.get("/register/password", loginController.postRegister);
router.get("/register/password/step2", loginController.step2);
router.post("/logout", loginController.logout);
module.exports = router;
