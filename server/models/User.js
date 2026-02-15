const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["resident", "collector", "admin"],
    default: "resident"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
