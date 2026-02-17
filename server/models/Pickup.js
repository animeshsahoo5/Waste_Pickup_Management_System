const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  wasteType: {
    type: String,
    enum: ["dry", "wet", "mixed"],
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Pickup", pickupSchema);
