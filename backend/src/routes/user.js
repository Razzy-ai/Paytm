const express = require('express');
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcryptjs");  // Import bcrypt for password hashing
const User = require("../models/user.model");
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// Signup validation
const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string().min(6), // Add minimum length for security
});

router.post("/signup", async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            details: error.errors
        });
    }
    console.log('Checking if user exists:', req.body.username);
    const existingUser = await User.findOne({
        username: { $regex: `^${req.body.username}$`, $options: "i" }
    });
    console.log('Existing user found:', existingUser);
    
    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword, // Save hashed password
    });
    const userId = user._id;

    // Create account with random balance
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    // Generate JWT with expiration time
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
        message: "User created successfully",
        token
    });
});

// Signin validation
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
    });

    if (user && await bcrypt.compare(req.body.password, user.password)) {  // Check hashed password
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
        return;
    }

    res.status(400).json({
        message: "Error while logging in"
    });
});

// Update user information
const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Error while updating information"
        });
    }

    const updateData = req.body;
    
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);  // Hash password if updated
    }

    await User.updateOne({ _id: req.userId }, updateData); // Correct query to find the user

    res.json({
        message: "Updated successfully"
    });
});

// Fetch bulk users
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstname: { "$regex": filter, "$options": "i" } },
            { lastname: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});

module.exports = router;
