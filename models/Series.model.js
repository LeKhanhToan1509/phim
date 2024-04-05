const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
    {
        title: String,
        engName: String,
        time: String,
        status: String,
        categories: [String],
        des: String,
        Like: {
            type: Boolean,
            default: false,
        },
        Deleted: {
            type: Boolean,
            default: false,
        },
        deleteAt: Date,
        LastWatch: Date,
        video_links: [String],
        ImageSrc: String,
    },
    {
        timestamps: true,
    }
);
const series = mongoose.model("Series", seriesSchema, "series");
module.exports = series;
