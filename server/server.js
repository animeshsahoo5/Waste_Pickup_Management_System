const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("WPMS API Running...");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const pickupRoutes = require("./routes/pickupRoutes");
app.use("/api/pickups", pickupRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);



//test Routes
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);


// Connect Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
