const express = require("express");
const router = express.Router();
const { getAssignedPickups, updatePickupStatus } = require("../controllers/collectorController");
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


router.get(
  "/pickups",
  protect,
  authorizeRoles("collector"),
  getAssignedPickups
);

router.put(
  "/pickup/:id",
  protect,
  authorizeRoles("collector"),
  updatePickupStatus
);

module.exports = router;
