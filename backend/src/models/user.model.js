const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Username field, which is required, unique
    username: {
      type: String,
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true, 
      index: true, 
      minlength: 3, 
      maxlength: 30, 
    },

    
    firstname: {
      type: String,
      required: true, 
      lowercase: true, 
      trim: true, 
      index: true, 
      maxlength: 50, 
    },

    
    lastname: {
      type: String,
      required: true, 
      lowercase: true, 
      trim: true, 
      index: true, 
      maxlength: 50, 
    },

  
    password: {
      type: String,
      required: true, 
      minlength: 6, 
    }
  },
  { timestamps: true } 
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
