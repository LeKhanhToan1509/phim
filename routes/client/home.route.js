const router = require("express").Router();
const homeController = require("../../controller/client/home.controller");
const middleware = require("../../controller/middleware/auth.middleware");

router.get("/", middleware.requireAuth, homeController.index);

module.exports = router;
