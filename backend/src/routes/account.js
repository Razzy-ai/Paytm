const express = require("express");
const { authMiddleware } = require('../middleware');
const Account = require("../models/account.model");
const { default: mongoose } = require('mongoose');

const router = express.Router();

// Route to get the account balance of the logged-in user
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        // Find the account of the user
        const account = await Account.findOne({ userId: req.userId });

        // If account not found, return an error message
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Return the balance of the account
        res.json({ balance: account.balance });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: "An internal server error occurred" });
    }
});



// Route to transfer balance from one account to another
router.post("/transfer", authMiddleware, async (req, res) => {
    // Start a session to handle transaction
    const session = await mongoose.startSession();
    try {
        // Begin the transaction
        session.startTransaction();

        const { amount, to } = req.body;

        // Input validation: Ensure 'amount' and 'to' are provided and valid
        if (!amount || !to || amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid transfer amount or recipient" });
        }

        // Fetch the account of the sender within the transaction session
        const account = await Account.findOne({ userId: req.userId }).session(session);

        // Check if the sender account exists and has sufficient balance
        if (!account || account.balance < amount) {
            await session.abortTransaction(); // Abort transaction if insufficient balance
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Fetch the recipient account within the transaction session
        const toAccount = await Account.findOne({ userId: to }).session(session);

        // Check if the recipient account exists
        if (!toAccount) {
            await session.abortTransaction(); // Abort transaction if the recipient doesn't exist
            return res.status(400).json({ message: "Invalid recipient account" });
        }

        // Perform the transfer (decrease balance from sender and increase balance for recipient)
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } } // Decrease the sender's balance
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } } // Increase the recipient's balance
        ).session(session);

        // Commit the transaction if everything goes well
        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        // If an error occurs, abort the transaction and log the error
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.error(error); 
        res.status(500).json({ message: "An internal error occurred" });
    } finally {
        // End the session to free resources
        session.endSession();
    }
});

module.exports = router;
