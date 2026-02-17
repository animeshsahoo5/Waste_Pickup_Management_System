const Pickup = require("../models/Pickup");


// 1️⃣ Create Pickup Request
exports.createPickup = async (req, res) => {
  try {
    const { wasteType, preferredDate } = req.body;

    const pickup = await Pickup.create({
      resident: req.user._id,
      wasteType,
      preferredDate
    });

    res.status(201).json(pickup);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 2️⃣ View Resident Pickup Requests
exports.getResidentPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ resident: req.user._id })
      .sort({ createdAt: -1 });

    res.json(pickups);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 3️⃣ Get Single Pickup (Track Status)
exports.getSinglePickup = async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    res.json(pickup);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
