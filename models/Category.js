const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true,
    }
);

const account = mongoose.model("Account", accountSchema, "accounts");
module.exports = account;
