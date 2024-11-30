const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const userController = require('./controller/UserController'); 
const userRoutes = require('./Routes/UserRoutes'); 
const users = require('./models/User'); 
const path = require('path'); 
const fs = require('fs'); 

const app = express();

// Enable CORS
app.use(
    cors({
      origin: "http://localhost:3000", // Frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// Parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files from the "uploads" directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  console.error("Uploads directory does not exist at:", uploadsDir);
} else {
  console.log("Uploads directory found at:", uploadsDir);
  app.use("/uploads", express.static(uploadsDir));
}

// User routes
app.use("/api/users", userRoutes); // Prefix all user routes with "/api/users"

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

