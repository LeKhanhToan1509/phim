const Film = require("../../models/Film.model");

module.exports.index = async (req, res) => {
    const film = await Film.find({}).skip(0).limit(5);
    const allFilms = await Film.find({}).skip(5).limit(100);

    res.render("client/pages/home.pug", {
        films: film,
        allFilms: allFilms,
    });
};
