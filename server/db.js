const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;