const Pickup = require("../models/Pickup");

// 1️⃣ View assigned pickups
exports.getAssignedPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({
      assignedCollector: req.user.id,
      status: "assigned",
    }).populate("resident", "name email");

    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 2️⃣ Update pickup status
exports.updatePickupStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    if (!["completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const pickup = await Pickup.findOne({
      _id: req.params.id,
      assignedCollector: req.user.id,
    });

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found or not assigned to you" });
    }

    pickup.status = status;
    pickup.remarks = remarks || "";

    await pickup.save();

    res.json({ message: "Pickup updated successfully", pickup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
