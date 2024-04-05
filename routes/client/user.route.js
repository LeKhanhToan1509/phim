const router = require("express").Router();
const userController = require("../../controller/client/user.controller");

router.get("/", userController.index);

module.exports = router;
