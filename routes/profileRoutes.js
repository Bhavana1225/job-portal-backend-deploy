const express = require("express");
const router = express.Router();
const protect = require("../middleware/authmiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");

// Get user profile by ID
router.get("/:id", protect, getProfile);

// Update user profile by ID
router.put("/:id", protect, updateProfile);

module.exports = router;
