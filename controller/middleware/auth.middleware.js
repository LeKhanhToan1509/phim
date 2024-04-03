const jwt = require("jsonwebtoken");
const account = require("../../models/Account.model");

module.exports.requireAuth = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            return res.redirect(`/account/login`);
        }
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await account.findById(userId).select("-password");
        if (!user) {
            return res.redirect(`/account/login`);
        }
        res.locals.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.redirect("/account/login?error=Invalid token");
        }

        console.error(error);
        res.redirect("/account/login?error=Server error occurred");
    }
};
