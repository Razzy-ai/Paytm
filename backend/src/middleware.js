const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId; // Attach the userId to the request object
            return next(); // Proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.error("JWT verification failed:", err); // Log the error for debugging
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware
};
