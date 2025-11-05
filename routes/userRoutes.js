const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");

const { protect } = require("../middleware/authmiddleware");

// Register and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
