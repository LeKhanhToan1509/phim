const Film = require("../../models/Film.model");
const Categories = require("../../models/Category.model");

module.exports.index = async (req, res) => {
    res.render("client/pages/introduce.pug");
};
