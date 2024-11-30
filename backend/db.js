const mongoose = require('mongoose');
const MONGO_URI="mongodb+srv://abdelrahmanamgad2210:abdo123@caloriecounter.t6jww.mongodb.net/CRMsystem";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
