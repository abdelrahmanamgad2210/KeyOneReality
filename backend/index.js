const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const userRoutes = require("./Routes/UserRoutes");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's domain in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If cookies or authentication are needed
  })
);

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Serve static files from "uploads" directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  console.error("Uploads directory does not exist at:", uploadsDir);
} else {
  console.log("Uploads directory found at:", uploadsDir);
  app.use("/uploads", express.static(uploadsDir));
}

// User routes
app.use("/api/users", userRoutes);

// Default route for health check
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
