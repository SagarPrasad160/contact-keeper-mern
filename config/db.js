const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI);
  console.log(`MongoDB connect: ${conn.connection.host}`);
};

module.exports = connectDB;
