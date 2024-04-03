const film = require("../../models/Film.model");

module.exports.index = async (req, res) => {
    try {
        const film = await film.find({}).skip(0).limit(5);
        const allFilms = await film.find({}).skip(5).limit(100);

        res.render("client/pages/home.pug", {
            films: film,
            allFilms: allFilms,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An internal error occurred");
    }
};
