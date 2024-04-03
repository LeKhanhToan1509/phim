const bcrypt = require("bcryptjs");
const account = require("../../models/Account.model.js");

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const sendResponse = (res, status, url, message) => {
    res.status(status).redirect(
        url + "?message=" + encodeURIComponent(message)
    );
};

module.exports.login = (req, res) => {
    res.render("client/pages/login.pug");
};

module.exports.postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await account.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.cookie("token", user.token, { httpOnly: true });
            res.redirect(`/`);
        } else {
            sendResponse(
                res,
                401,
                "/login",
                "Your login details are incorrect"
            );
        }
    } catch (error) {
        console.error("Login error:", error);
        sendResponse(res, 500, "/login", "Server error occurred");
    }
});

module.exports.register = (req, res) => {
    res.render("client/pages/register.pug");
};

module.exports.postRegister = asyncHandler(async (req, res) => {
    const email = req.query.email;
    res.render("client/pages/register2.pug", { email });
});

module.exports.userRegister = asyncHandler(async (req, res) => {
    const { password, ...otherUserData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new account({ ...otherUserData, password: hashedPassword });
    await user.save();
    res.redirect("/account/register/password/step2");
});

module.exports.step2 = (req, res) => {
    res.render("client/pages/step2.pug");
};

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
