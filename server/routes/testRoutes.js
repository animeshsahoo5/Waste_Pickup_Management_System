const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/resident",
  protect,
  authorizeRoles("resident"),
  (req, res) => {
    res.json({ message: "Resident Access Granted" });
  }
);

router.get("/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin Access Granted" });
  }
);

module.exports = router;
