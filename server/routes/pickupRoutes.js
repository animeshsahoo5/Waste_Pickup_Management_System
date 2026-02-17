const express = require("express");
const router = express.Router();

const {
  createPickup,
  getResidentPickups,
  getSinglePickup
} = require("../controllers/pickupController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


// Resident Only Routes
router.post("/create",
  protect,
  authorizeRoles("resident"),
  createPickup
);

router.get("/my-pickups",
  protect,
  authorizeRoles("resident"),
  getResidentPickups
);

router.get("/:id",
  protect,
  authorizeRoles("resident"),
  getSinglePickup
);

module.exports = router;
