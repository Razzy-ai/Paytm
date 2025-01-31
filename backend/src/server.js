require('dotenv').config(); // Load environment variables at the very top

const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDb = require('./db/db.js');
const mainRouter = require("./routes/index");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Use built-in JSON parser (no need for body-parser)

// API Routes
app.use("/api/v1", mainRouter);

// Connect to the database with error handling
connectDb()
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1); // Exit process if DB connection fails
    });

 


// Define the server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});


