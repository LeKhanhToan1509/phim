const HomeRoutes = require("./home.route");
const AccountRoutes = require("./account.route");
module.exports = (app) => {
    app.use("/", HomeRoutes);
    app.use("/account", AccountRoutes);
};
