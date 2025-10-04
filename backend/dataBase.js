const mongoose = require("mongoose");

// MongoDB Connection only
const connectMongoDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((data) => {
            console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`❌ MongoDB connection failed: ${err.message}`);
        });
};

module.exports = { connectMongoDB };
