const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

// Base route for user and account routes
router.use("/user", userRouter);  // Routes related to user operations will be handled by the userRouter
router.use("/account", accountRouter);  // Routes related to account operations will be handled by the accountRouter

module.exports = router;
