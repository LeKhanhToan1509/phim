const Series = require("../../models/Series.model");
const Category = require("../../models/Category.model");
const Fuse = require("fuse.js");

async function getMoviesByGenre(genreId) {
    return Series.find({ categories: { $in: [genreId] } }).limit(60);
}
module.exports.index = async (req, res) => {
    const options = {
        keys: ["title"],
    };
    movies = await Series.find({});
    const fuse = new Fuse(movies, options);
    if (req.query.title) {
        const results = fuse.search(req.query.title);
        const uniqueMovies = new Map();
        results.forEach((result) => {
            const movie = result.item;
            if (!uniqueMovies.has(movie.title)) {
                uniqueMovies.set(movie.title, movie);
            }
        });
        movies = Array.from(uniqueMovies.values());
    }

    const genres = [
        "660e346c39ba78d97a6f8a10",
        "660e353739ba78d97a70a756",
        "660e360739ba78d97a71dc68",
        "660e358d39ba78d97a71287e",
        "660e35dc39ba78d97a71993c",
        "660e36b439ba78d97a72d6c3",
    ];
    const moviePromises = genres.map((genre) => getMoviesByGenre(genre));
    const [
        actionMovies,
        loveMovies,
        honorMovies,
        comedyMovies,
        thrillerMovies,
        scienceMovies,
    ] = await Promise.all(moviePromises);
    res.render("client/pages/series.pug", {
        queryTitle: req.query.title,
        movies: movies.slice(0, 60),
        actionMovies,
        loveMovies,
        honorMovies,
        comedyMovies,
        thrillerMovies,
        scienceMovies,
    });
};

module.exports.detail = async (req, res, next) => {
    try {
        const film = await Series.findById(req.params.id);
        if (!film) {
            return res.status(404).send("Film not found");
        }

        const [categories, relative, films] = await Promise.all([
            Category.find({ _id: { $in: film.categories } }),
            Series.find({ categories: { $in: film.categories } }).limit(30),
            Series.find({})
                .limit(60)
                .skip(Math.floor(Math.random() * 100)),
        ]);

        const name = categories.map((category) => category.name);

        const newWatch = { id: film._id, lastAt: new Date() };
        res.locals.user.lastWatch.unshift(newWatch);
        await res.locals.user.save();

        res.render("client/pages/detailSeries.pug", {
            film,
            relative,
            name,
            films,
        });
    } catch (error) {
        console.error("Error in detail module: ", error);
        next(error);
    }
};

module.exports.detailPart = async (req, res) => {
    const film = await Series.findById({
        _id: req.params.id,
    });
    const part = req.params.part;
    const video = film.video_links[part - 1];
    const arr = film.categories;
    const name = [];
    const relative = await Series.find({ categories: { $in: arr } }).limit(30);
    for (let i = 0; i < arr.length; i++) {
        const genre = await Category.findById(arr[i]);
        name[i] = genre.name;
    }
    let newWatch = {
        id: film._id,
        lastAt: new Date(),
    };
    console.log(newWatch);
    res.locals.user.lastWatch.unshift(newWatch);
    await res.locals.user.save();
    let films = await Series.find({})
        .limit(60)
        .skip(Math.floor(Math.random() * 100));
    res.render("client/pages/detailPart.pug", {
        film,
        relative,
        name,
        films,
        video,
        part,
    });
};

module.exports.likeChange = async (req, res) => {
    const movie = await Film.findById(req.params.id);
    let liked;
    const likeIndex = res.locals.user.like.findIndex(
        (like) => like.id == movie._id
    );
    if (likeIndex !== -1) {
        res.locals.user.like.splice(likeIndex, 1);
        liked = false;
    } else {
        res.locals.user.like.unshift({ id: movie._id, likeAt: new Date() });
        liked = true;
    }
    await res.locals.user.save();
    res.json({ liked: liked });
};
