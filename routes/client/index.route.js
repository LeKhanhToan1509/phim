const HomeRoutes = require("./home.route");
const AccountRoutes = require("./account.route");
const introduceRoutes = require("./introduce.route");
module.exports = (app) => {
    app.use("/", HomeRoutes);
    app.use("/account", AccountRoutes);
    app.use("/introduce", introduceRoutes);
};
