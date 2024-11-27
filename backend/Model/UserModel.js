const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nic: { type: String, default: null },
  age: { type: Number, default: null },
  address: { type: String, default: null },
});

// Explicitly set the collection name to "user"
module.exports = mongoose.model("User", userSchema, "user");
