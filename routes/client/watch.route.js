const router = require("express").Router();
const watchController = require("../../controller/client/watch.controller");
const middleware = require("../../controller/middleware/auth.middleware");

router.get("/", middleware.requireAuth, watchController.index);
router.get("/detail/:id", middleware.requireAuth, watchController.watchFilm);
router.post(
    "/changeLike/:id",
    middleware.requireAuth,
    watchController.likeChange
);
module.exports = router;
