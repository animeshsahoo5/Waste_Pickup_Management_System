const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllPickups,
  assignCollector
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


// Admin Only Routes
router.get("/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

router.get("/pickups",
  protect,
  authorizeRoles("admin"),
  getAllPickups
);

router.put("/assign",
  protect,
  authorizeRoles("admin"),
  assignCollector
);

module.exports = router;
