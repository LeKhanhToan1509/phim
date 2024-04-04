const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema, "categories");
module.exports = Category;
