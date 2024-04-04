const Film = require("../../models/Film.model");

module.exports.index = async (req, res) => {
    const actionMovies = await Film.find({
        Sgeneros: { $in: ["660e346c39ba78d97a6f8a10"] },
    }).limit(30);
    const loveMovies = await Film.find({
        Sgeneros: { $in: ["660e353739ba78d97a70a756"] },
    }).limit(30);
    const honorMovies = await Film.find({
        Sgeneros: { $in: ["660e360739ba78d97a71dc68"] },
    }).limit(30);
    const [favouriteMovies, initialFilms] = await Promise.all([
        Film.find({ Like: true }),
        Film.find({}).skip(0).limit(5),
    ]);

    res.render("client/pages/home.pug", {
        loveMovies: loveMovies,
        actionMovies: actionMovies,
        favouriteMovies: favouriteMovies,
        films: initialFilms,
        honorMovies: honorMovies,
    });
};
