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
    const likeMovies = res.locals.user.like;
    console.log(likeMovies);
    const favouriteMovies = await Film.find({
        _id: { $in: likeMovies },
    });
    console.log(favouriteMovies);
    const moviePromises = genres.map((genre) => getMoviesByGenre(genre));
    const initialFilms = await Film.find({}).skip(0).limit(5);
    const [actionMovies, loveMovies, honorMovies] = await Promise.all(
        moviePromises
    );
    const lastWatch = await Film.find({
        _id: { $in: res.locals.user.lastWatch },
    });
    res.render("client/pages/home.pug", {
        loveMovies: loveMovies,
        actionMovies: actionMovies,
        favouriteMovies: favouriteMovies,
        films: initialFilms,
        honorMovies: honorMovies,
        lastWatch: lastWatch,
    });
};
