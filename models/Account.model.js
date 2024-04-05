const mongoose = require("mongoose");
const { generateString } = require("../helper/gen.js");

const accountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "you",
        },
        email: String,
        password: String,
        like: [
            {
                id: String,
                likeAt: Date,
            },
        ],
        lastWatch: [
            {
                id: String,
                lastAt: Date,
            },
        ],
        token: {
            type: String,
            default: generateString(10),
        },
        image: String,
        delete: { type: Boolean, default: false },
        updateAt: Date,
    },
    {
        timestamps: true,
    }
);

const account = mongoose.model("account", accountSchema, "accounts");
module.exports = account;
