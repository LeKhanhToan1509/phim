const mongoose = require("mongoose");
const { generateString } = require("../helper/gen.js");

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: {
        type: String,
        default: generateString(10),
    },
    image: String,
    delete: { type: Boolean, default: false },
});

const Account = mongoose.model("Account", accountSchema, "accounts");
module.exports = Account;
