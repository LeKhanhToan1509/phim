const router = require("express").Router();
const seriesController = require("../../controller/client/series.controller");
const middleware = require("../../controller/middleware/auth.middleware");

router.get("/", middleware.requireAuth, seriesController.index);
router.get("/detail/:id", middleware.requireAuth, seriesController.detail);
router.get("/:id/:part", middleware.requireAuth, seriesController.detailPart);
module.exports = router;
