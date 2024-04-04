const router = require("express").Router();
const introduceController = require("../../controller/client/introduce.controller");
const middleware = require("../../controller/middleware/auth.middleware");

router.get("/", middleware.requireAuth, introduceController.index);

module.exports = router;
