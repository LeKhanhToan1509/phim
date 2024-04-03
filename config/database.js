const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};
