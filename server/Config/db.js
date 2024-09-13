const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.info("Connected to Database");
    } catch (err) {
        console.error("Error Connecting to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDB;

