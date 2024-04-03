const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
    {
        Name: String,
        engName: String,
        VideoLink: String,
        Country: String,
        Runtime: String,
        ImageSrc: String,
        Sgeneros: String,
        Description: String,
        Like: {
            type: Boolean,
            default: false,
        },
        Deleted: {
            type: Boolean,
            default: false,
        },
        deleteAt: Date,
    },
    {
        timestamps: true,
    }
);

const film = mongoose.model("Film", filmSchema, "films");
module.exports = film;
