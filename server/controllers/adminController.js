const Pickup = require("../models/Pickup");
const User = require("../models/User");


// 1️⃣ Admin Dashboard (Basic Stats)
exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Pickup.countDocuments();
    const pending = await Pickup.countDocuments({ status: "pending" });
    const assigned = await Pickup.countDocuments({ status: "assigned" });
    const completed = await Pickup.countDocuments({ status: "completed" });

    res.json({ total, pending, assigned, completed });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 2️⃣ View All Pickups (With Filters)
exports.getAllPickups = async (req, res) => {
  try {
    const { status, area, date } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (area) filter.area = area;

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.preferredDate = { $gte: start, $lte: end };
    }

    const pickups = await Pickup.find(filter)
      .populate("resident", "name email")
      .populate("assignedCollector", "name email")
      .sort({ createdAt: -1 });

    res.json(pickups);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 3️⃣ Assign Collector
exports.assignCollector = async (req, res) => {
  try {
    const { pickupId, collectorId, assignedDate } = req.body;

    const pickup = await Pickup.findById(pickupId);
    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    const collector = await User.findOne({
      _id: collectorId,
      role: "collector"
    });

    if (!collector) {
      return res.status(404).json({ message: "Collector not found" });
    }

    pickup.assignedCollector = collectorId;
    pickup.assignedDate = assignedDate;
    pickup.status = "assigned";

    await pickup.save();

    res.json({ message: "Collector assigned successfully", pickup });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
