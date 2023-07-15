const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.mongoURI;

const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI);
  console.log(`MongoDB connect: ${conn.connection.host}`);
};

module.exports = connectDB;
