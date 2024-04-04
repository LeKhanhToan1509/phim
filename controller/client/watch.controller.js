const Film = require("../../models/Film.model");
const Fuse = require("fuse.js");
const Category = require("../../models/Category.model");

async function getMoviesByGenre(genreId) {
    return Film.find({ Sgeneros: { $in: [genreId] } }).limit(60);
}

module.exports.index = async (req, res) => {
    try {
        let movies = await Film.find({});
        const options = {
            keys: ["Name"],
        };
        const fuse = new Fuse(movies, options);

        if (req.query.title) {
            const results = fuse.search(req.query.title);
            movies = results.map((result) => result.item);
        }

        const genres = [
            "660e346c39ba78d97a6f8a10",
            "660e353739ba78d97a70a756",
            "660e360739ba78d97a71dc68",
            "660e358d39ba78d97a71287e",
            "660e35dc39ba78d97a71993c",
            "660e36b439ba78d97a72d6c3",
            "660e376f39ba78d97a73db18",
        ];

        const moviePromises = genres.map((genre) => getMoviesByGenre(genre));
        const [
            actionMovies,
            loveMovies,
            honorMovies,
            comedyMovies,
            thrillerMovies,
            scienceMovies,
            cartoonMovies,
        ] = await Promise.all(moviePromises);

        res.render("client/pages/watch.pug", {
            queryTitle: req.query.title,
            movies: movies.slice(0, 60),
            actionMovies,
            loveMovies,
            honorMovies,
            comedyMovies,
            thrillerMovies,
            scienceMovies,
            cartoonMovies,
        });
    } catch (error) {
        console.error("Failed to load movies:", error);
        res.status(500).send("Error retrieving movies");
    }
};

module.exports.watchFilm = async (req, res) => {
    const movie = await Film.findById(req.params.id);
    if (!movie) {
        return res.status(404).send("Movie not found");
    }
    const arr = movie.Sgeneros;
    const name = [];
    const relative = await Film.find({ Sgeneros: { $in: arr } }).limit(30);
    for (let i = 0; i < arr.length; i++) {
        const genre = await Category.findById(arr[i]);
        name[i] = genre.name;
    }

    let movies = await Film.find({})
        .limit(60)
        .skip(Math.floor(Math.random() * 100));

    res.render("client/pages/detail.pug", {
        movie,
        name,
        relative,
        movies,
    });
};
