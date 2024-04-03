const Film = require("../../models/Film.model");

module.exports.index = async (req, res) => {
    const [initialFilms, moreFilms] = await Promise.all([
        Film.find({}).skip(0).limit(5),
        Film.find({}).skip(5).limit(100),
    ]);

    res.render("client/pages/home.pug", {
        films: initialFilms,
        allFilms: moreFilms,
    });
};
