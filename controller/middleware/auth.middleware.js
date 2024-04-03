const account = require("../../models/account.model");

module.exports.requireAuth = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            return res.redirect(`/account/login`);
        }
        const token = req.cookies.token;
        const user = await account
            .findOne({ token: token })
            .select("-password");
        if (!user) {
            return res.redirect(`account/login`);
        } else {
            res.locals.user = user;
        }
        next();
    } catch (error) {
        console.error(error);
        res.redirect("/account/login?error=Server error occurred");
    }
};
