const HomeRoutes = require("./home.route");
const AccountRoutes = require("./account.route");
const middleware = require("../../middleware/auth.middleware");
module.exports = (app) => {
    app.use("/", HomeRoutes);
    app.use("/account", AccountRoutes);
};
