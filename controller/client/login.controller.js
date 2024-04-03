const account = require("../../models/account.model");

module.exports.login = (req, res) => {
    res.render("client/pages/login.pug");
};

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await account.findOne({
            email: email,
            password: password,
        });
        if (user) {
            res.cookie("token", user.token, { httpOnly: true });
            res.redirect(`/`);
        } else {
            res.status(401).redirect("/login");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.redirect("/login?error=Server error occurred");
    }
};

module.exports.register = (req, res) => {
    res.render("client/pages/register.pug");
};

module.exports.postRegister = async (req, res) => {
    const email = req.query.email;
    res.render("client/pages/register2.pug", {
        email: email,
    });
};
module.exports.userRegister = async (req, res) => {
    const user = new account({ ...req.body });
    await user.save();
    res.redirect("/account/register/password/step2");
};

module.exports.step2 = async (req, res) => {
    res.render("client/pages/step2.pug");
};

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
