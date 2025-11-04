const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { protect } = require("../middleware/authmiddleware");
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleJobFilled,
  getEmployerJobs,
} = require("../controllers/jobController");

// Middleware to validate MongoDB ObjectId params
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  next();
};

// Public routes
router.get("/", getJobs);

// Employer-only route (before /:id)
router.get("/employer", protect, getEmployerJobs);

// Get job by ID (public)
router.get("/:id", validateObjectId, getJobById);

// Private routes (employer only)
router.post("/", protect, createJob);
router.put("/:id", protect, validateObjectId, updateJob);
router.delete("/:id", protect, validateObjectId, deleteJob);
router.patch("/:id/filled", protect, validateObjectId, toggleJobFilled);

module.exports = router;
