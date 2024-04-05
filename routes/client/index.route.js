const HomeRoutes = require("./home.route");
const AccountRoutes = require("./account.route");
const WatchRoutes = require("./watch.route");
const UserRoutes = require("./user.route");
const middleware = require("../../controller/middleware/auth.middleware");

module.exports = (app) => {
    app.use("/", HomeRoutes);
    app.use("/account", AccountRoutes);
    app.use("/watch", WatchRoutes);
    app.use("/user", UserRoutes);
};
