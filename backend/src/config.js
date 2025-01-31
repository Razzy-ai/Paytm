require('dotenv').config(); // Ensure env variables are loaded
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined. Check your .env file.");
    process.exit(1);  // Stop execution if JWT_SECRET is missing
}

module.exports = { JWT_SECRET };
