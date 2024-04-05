const Film = require("../../models/Film.model");
const Series = require("../../models/Series.model");
async function getMoviesByGenre(genreId) {
    return Film.find({ Sgeneros: { $in: [genreId] } }).limit(60);
}

module.exports.index = async (req, res) => {
    last = res.locals.user.lastWatch;
    last.sort((a, b) => b.lastAt - a.lastAt);
    last = last.slice(-30);
    console.log(last);
    const [lastWatchFilms, lastWatchSeries] = await Promise.all([
        Film.find({ _id: { $in: last.map((watch) => watch.id) } }),
        Series.find({ _id: { $in: last.map((watch) => watch.id) } }),
    ]);

    let lastWatch = [...lastWatchFilms, ...lastWatchSeries];

    lastWatch.sort(
        (a, b) =>
            last.findIndex((watch) => watch.id === a._id.toString()) -
            last.findIndex((watch) => watch.id === b._id.toString())
    );

    let like = res.locals.user.like;
    like.sort((a, b) => b.likeAt - a.likeAt);
    const favouriteMovies = await Film.find({
        _id: { $in: like.map((watch) => watch.id) },
    });

    favouriteMovies.sort(
        (a, b) =>
            last.findIndex((watch) => watch.id === a._id.toString()) -
            last.findIndex((watch) => watch.id === b._id.toString())
    );
    const genres = [
        "660e346c39ba78d97a6f8a10",
        "660e353739ba78d97a70a756",
        "660e360739ba78d97a71dc68",
    ];
    const moviePromises = genres.map((genre) => getMoviesByGenre(genre));
    const initialFilms = await Film.find({}).skip(0).limit(5);
    const [actionMovies, loveMovies, honorMovies] = await Promise.all(
        moviePromises
    );

    res.render("client/pages/home.pug", {
        loveMovies: loveMovies,
        actionMovies: actionMovies,
        favouriteMovies: favouriteMovies,
        films: initialFilms,
        honorMovies: honorMovies,
        lastWatch: lastWatch,
    });
};
