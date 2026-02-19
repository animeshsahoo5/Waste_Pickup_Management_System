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
  area: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  assignedDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed", "cancelled"],
    default: "pending"
  },
  assignedCollector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    },
  remarks: {
    type: String,
    default: "",
  },
}, { timestamps: true });


module.exports = mongoose.model("Pickup", pickupSchema);
