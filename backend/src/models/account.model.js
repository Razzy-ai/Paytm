const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the account schema
const accountSchema = new mongoose.Schema({
  // Reference to the User model, this will link the account to a specific user
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId type for referencing another model
    ref: "User", // The model being referenced
    required: true, // Ensure this field is always provided
  },

  // Balance of the account, must be a positive number
  balance: {
    type: Number, // Data type for the balance field
    required: true, // Balance is required
    min: [0, 'Balance cannot be negative'], // Ensure the balance is not negative
  }
}, { timestamps: true }); // Enable timestamps for automatic createdAt and updatedAt fields

// Optional: Indexing userId for improved query performance
accountSchema.index({ userId: 1 });

// Create the Account model from the schema
const Account = mongoose.model("Account", accountSchema);

// Export the Account model to be used in other parts of the application
module.exports = Account;
