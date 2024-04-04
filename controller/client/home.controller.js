const Film = require("../../models/Film.model");

async function getMoviesByGenre(genreId) {
    return Film.find({ Sgeneros: { $in: [genreId] } }).limit(60);
}

module.exports.index = async (req, res) => {
    const genres = [
        "660e346c39ba78d97a6f8a10",
        "660e353739ba78d97a70a756",
        "660e360739ba78d97a71dc68",
    ];
    const moviePromises = genres.map((genre) => getMoviesByGenre(genre));
    const favouriteMovies = await Film.find({ Like: true });
    const initialFilms = await Film.find({}).skip(0).limit(5);
    const [actionMovies, loveMovies, honorMovies] = await Promise.all(
        moviePromises
    );
    const LastWatch = await Film.find({}).sort({ LastWatch: -1 }).limit(10);
    res.render("client/pages/home.pug", {
        loveMovies: loveMovies,
        actionMovies: actionMovies,
        favouriteMovies: favouriteMovies,
        films: initialFilms,
        honorMovies: honorMovies,
        lastWatch: LastWatch,
    });
};
